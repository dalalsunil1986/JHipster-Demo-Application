package com.blogapp.service;

import com.blogapp.service.dto.BlogDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Blog.
 */
public interface BlogService {

    /**
     * Save a blog.
     *
     * @param blogDTO the entity to save
     * @return the persisted entity
     */
    BlogDTO save(BlogDTO blogDTO);

    /**
     *  Get all the blogs.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<BlogDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" blog.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    BlogDTO findOne(Long id);

    /**
     *  Delete the "id" blog.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
