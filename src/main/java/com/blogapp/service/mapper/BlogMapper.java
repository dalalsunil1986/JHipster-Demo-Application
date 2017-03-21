package com.blogapp.service.mapper;

import com.blogapp.domain.*;
import com.blogapp.service.dto.BlogDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Blog and its DTO BlogDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BlogMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    BlogDTO blogToBlogDTO(Blog blog);

    List<BlogDTO> blogsToBlogDTOs(List<Blog> blogs);

    @Mapping(source = "categoryId", target = "category")
    Blog blogDTOToBlog(BlogDTO blogDTO);

    List<Blog> blogDTOsToBlogs(List<BlogDTO> blogDTOs);

    default Category categoryFromId(Long id) {
        if (id == null) {
            return null;
        }
        Category category = new Category();
        category.setId(id);
        return category;
    }
}
