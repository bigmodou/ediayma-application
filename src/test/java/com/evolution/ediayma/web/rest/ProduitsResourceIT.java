package com.evolution.ediayma.web.rest;

import com.evolution.ediayma.EdiaymaApplicationApp;
import com.evolution.ediayma.domain.Produits;
import com.evolution.ediayma.repository.ProduitsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProduitsResource} REST controller.
 */
@SpringBootTest(classes = EdiaymaApplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProduitsResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Long DEFAULT_PRIX = 1L;
    private static final Long UPDATED_PRIX = 2L;

    @Autowired
    private ProduitsRepository produitsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProduitsMockMvc;

    private Produits produits;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produits createEntity(EntityManager em) {
        Produits produits = new Produits()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .prix(DEFAULT_PRIX);
        return produits;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Produits createUpdatedEntity(EntityManager em) {
        Produits produits = new Produits()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .prix(UPDATED_PRIX);
        return produits;
    }

    @BeforeEach
    public void initTest() {
        produits = createEntity(em);
    }

    @Test
    @Transactional
    public void createProduits() throws Exception {
        int databaseSizeBeforeCreate = produitsRepository.findAll().size();
        // Create the Produits
        restProduitsMockMvc.perform(post("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produits)))
            .andExpect(status().isCreated());

        // Validate the Produits in the database
        List<Produits> produitsList = produitsRepository.findAll();
        assertThat(produitsList).hasSize(databaseSizeBeforeCreate + 1);
        Produits testProduits = produitsList.get(produitsList.size() - 1);
        assertThat(testProduits.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testProduits.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testProduits.getPrix()).isEqualTo(DEFAULT_PRIX);
    }

    @Test
    @Transactional
    public void createProduitsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produitsRepository.findAll().size();

        // Create the Produits with an existing ID
        produits.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProduitsMockMvc.perform(post("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produits)))
            .andExpect(status().isBadRequest());

        // Validate the Produits in the database
        List<Produits> produitsList = produitsRepository.findAll();
        assertThat(produitsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProduits() throws Exception {
        // Initialize the database
        produitsRepository.saveAndFlush(produits);

        // Get all the produitsList
        restProduitsMockMvc.perform(get("/api/produits?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produits.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX.intValue())));
    }
    
    @Test
    @Transactional
    public void getProduits() throws Exception {
        // Initialize the database
        produitsRepository.saveAndFlush(produits);

        // Get the produits
        restProduitsMockMvc.perform(get("/api/produits/{id}", produits.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(produits.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProduits() throws Exception {
        // Get the produits
        restProduitsMockMvc.perform(get("/api/produits/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProduits() throws Exception {
        // Initialize the database
        produitsRepository.saveAndFlush(produits);

        int databaseSizeBeforeUpdate = produitsRepository.findAll().size();

        // Update the produits
        Produits updatedProduits = produitsRepository.findById(produits.getId()).get();
        // Disconnect from session so that the updates on updatedProduits are not directly saved in db
        em.detach(updatedProduits);
        updatedProduits
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .prix(UPDATED_PRIX);

        restProduitsMockMvc.perform(put("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProduits)))
            .andExpect(status().isOk());

        // Validate the Produits in the database
        List<Produits> produitsList = produitsRepository.findAll();
        assertThat(produitsList).hasSize(databaseSizeBeforeUpdate);
        Produits testProduits = produitsList.get(produitsList.size() - 1);
        assertThat(testProduits.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testProduits.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testProduits.getPrix()).isEqualTo(UPDATED_PRIX);
    }

    @Test
    @Transactional
    public void updateNonExistingProduits() throws Exception {
        int databaseSizeBeforeUpdate = produitsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProduitsMockMvc.perform(put("/api/produits")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produits)))
            .andExpect(status().isBadRequest());

        // Validate the Produits in the database
        List<Produits> produitsList = produitsRepository.findAll();
        assertThat(produitsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProduits() throws Exception {
        // Initialize the database
        produitsRepository.saveAndFlush(produits);

        int databaseSizeBeforeDelete = produitsRepository.findAll().size();

        // Delete the produits
        restProduitsMockMvc.perform(delete("/api/produits/{id}", produits.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Produits> produitsList = produitsRepository.findAll();
        assertThat(produitsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
