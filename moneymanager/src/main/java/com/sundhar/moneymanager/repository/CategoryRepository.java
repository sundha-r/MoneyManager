package com.sundhar.moneymanager.repository;

import com.sundhar.moneymanager.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {

    //select * form tbl_categories where profile_id=1
    List<CategoryEntity> findByProfileId(Long profileId);

    //used to update the category and fetch the category for the logged-in user
    Optional<CategoryEntity>findByIdAndProfileId(Long id,Long profileId);

    //fetch the category based on the type which is income or expense
    List<CategoryEntity>findBytypeAndProfileId(String type,Long profileId);


    Optional<CategoryEntity>findByIdAndTypeAndProfileId(Long id,String type,Long profileId);

    Boolean existsByNameAndProfileId(String name,Long ProfileId);
}
