package com.sundhar.moneymanager.service;

import com.sundhar.moneymanager.dto.CategoryDTO;
import com.sundhar.moneymanager.entity.CategoryEntity;
import com.sundhar.moneymanager.entity.ProfileEntity;
import com.sundhar.moneymanager.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class CategoryService {
    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;

    //save category
    public CategoryDTO saveCategory(CategoryDTO categoryDTO){
      ProfileEntity profile=  profileService.getCurrentProfile();

        if(categoryRepository.existsByNameAndProfileId(categoryDTO.getName(),profile.getId())){
            throw new RuntimeException("Category with this name already exists");

        }
        CategoryEntity category=toEntity(categoryDTO,profile);
        category=categoryRepository.save(category);
        return toDTO(category);
    }

    //get categories for current user
    public List<CategoryDTO> getCategoriesForCurrentUser(){
        ProfileEntity profile=profileService.getCurrentProfile();
        List<CategoryEntity> categories=categoryRepository.findByProfileId(profile.getId());
//        List<CategoryDTO> DTOcategories=categories.stream().map(
//                category->toDTO(category)
//        ).collect(Collectors.toList());
        //advance step
        return categories.stream().map(this::toDTO).toList();
    }

   //get categories by type
    public List<CategoryDTO> getCategoriesByType(String type) {
        ProfileEntity profile=profileService.getCurrentProfile();
        List<CategoryEntity> categories=categoryRepository.findBytypeAndProfileId(type, profile.getId());
        return categories.stream().map(this::toDTO).toList();
    }

    //update the category for the current user
    public CategoryDTO updateCategory(Long categoryId,CategoryDTO dto){
        ProfileEntity profile=profileService.getCurrentProfile();
        CategoryEntity existingCategory=categoryRepository.findByIdAndProfileId(categoryId, profile.getId())
                .orElseThrow(()->new RuntimeException("Category not found or not accessible "));
        existingCategory.setName(dto.getName());
        existingCategory.setIcon(dto.getIcon());
        existingCategory.setType(dto.getType());
        existingCategory=categoryRepository.save(existingCategory);
        return toDTO(existingCategory);


    }
    //helper methods
    private CategoryEntity toEntity(CategoryDTO categoryDTO, ProfileEntity profile){
        return CategoryEntity.builder()
                .name(categoryDTO.getName())
                .type(categoryDTO.getType())
                .icon(categoryDTO.getIcon())
                .profile(profile)
                .build();
    }

    private CategoryDTO toDTO(CategoryEntity categoryEntity){
        return CategoryDTO.builder()
                .id(categoryEntity.getId())
                .profileId(categoryEntity.getProfile()!=null ? categoryEntity.getProfile().getId() : null)
                .name(categoryEntity.getName())
                .type(categoryEntity.getType())
                .createdAt(categoryEntity.getCreatedAt())
                .updatedAt(categoryEntity.getUpdatedAt())
                .icon(categoryEntity.getIcon())
                .build();
    }



}
