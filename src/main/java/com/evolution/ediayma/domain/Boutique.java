package com.evolution.ediayma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Task entity.\n@author The JHipster team.
 */
@ApiModel(description = "Task entity.\n@author The JHipster team.")
@Entity
@Table(name = "boutique")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Boutique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "description")
    private String description;

    @Column(name = "adresse")
    private String adresse;

    @OneToMany(mappedBy = "boutique")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Produits> produits = new HashSet<>();

    @OneToMany(mappedBy = "boutique")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Location> locations = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "boutiques", allowSetters = true)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Boutique nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public Boutique description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAdresse() {
        return adresse;
    }

    public Boutique adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Set<Produits> getProduits() {
        return produits;
    }

    public Boutique produits(Set<Produits> produits) {
        this.produits = produits;
        return this;
    }

    public Boutique addProduits(Produits produits) {
        this.produits.add(produits);
        produits.setBoutique(this);
        return this;
    }

    public Boutique removeProduits(Produits produits) {
        this.produits.remove(produits);
        produits.setBoutique(null);
        return this;
    }

    public void setProduits(Set<Produits> produits) {
        this.produits = produits;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public Boutique locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Boutique addLocation(Location location) {
        this.locations.add(location);
        location.setBoutique(this);
        return this;
    }

    public Boutique removeLocation(Location location) {
        this.locations.remove(location);
        location.setBoutique(null);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Client getClient() {
        return client;
    }

    public Boutique client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Boutique)) {
            return false;
        }
        return id != null && id.equals(((Boutique) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Boutique{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", description='" + getDescription() + "'" +
            ", adresse='" + getAdresse() + "'" +
            "}";
    }
}
