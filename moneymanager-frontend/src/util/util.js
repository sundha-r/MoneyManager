export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";

  // Convert number to string to handle decimals
  const numStr = num.toString();
  const parts = numStr.split(".");

  let integerPart = parts[0];
  const fractionalPart = parts[1];

  // Indian numbering system
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(
    0,
    integerPart.length - 3
  );

  if (otherNumbers !== "") {
    const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g,",");
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree;
  }

  // Combine integer and fractional parts
  return fractionalPart
    ? `${integerPart}.${fractionalPart}`
    : integerPart;
};

//creating a linechart data

const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";

    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};

const formatDateForChart = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", {
        month: "long",
    });

    return `${day}${getOrdinalSuffix(day)} ${month}`;
};

export const prepareIncomeLineChartData = (incomes) => {
    if (!incomes?.length) return [];

    const groupedData = incomes.reduce((acc, income) => {
        const date = income.date;

        if (!acc[date]) {
            acc[date] = {
                date,
                month: formatDateForChart(date),
                totalAmount: 0,
                items: [],
            };
        }

        acc[date].totalAmount += Number(income.amount);
        acc[date].items.push(income);

        return acc;
    }, {});

    return Object.values(groupedData).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
};