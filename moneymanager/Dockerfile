# Build Stage
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Runtime Stage
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar moneymanager-v1.0.jar

EXPOSE 9090

ENTRYPOINT ["java","-jar","moneymanager-v1.0.jar"]


