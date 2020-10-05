package com.evolution.ediayma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Produits.
 */
@Entity
@Table(name = "produits")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Produits implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "prix")
    private Long prix;

    @OneToMany(mappedBy = "produits")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Categorie> categories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "produits", allowSetters = true)
    private Boutique boutique;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Produits title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Produits description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPrix() {
        return prix;
    }

    public Produits prix(Long prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Long prix) {
        this.prix = prix;
    }

    public Set<Categorie> getCategories() {
        return categories;
    }

    public Produits categories(Set<Categorie> categories) {
        this.categories = categories;
        return this;
    }

    public Produits addCategorie(Categorie categorie) {
        this.categories.add(categorie);
        categorie.setProduits(this);
        return this;
    }

    public Produits removeCategorie(Categorie categorie) {
        this.categories.remove(categorie);
        categorie.setProduits(null);
        return this;
    }

    public void setCategories(Set<Categorie> categories) {
        this.categories = categories;
    }

    public Boutique getBoutique() {
        return boutique;
    }

    public Produits boutique(Boutique boutique) {
        this.boutique = boutique;
        return this;
    }

    public void setBoutique(Boutique boutique) {
        this.boutique = boutique;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Produits)) {
            return false;
        }
        return id != null && id.equals(((Produits) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Produits{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", prix=" + getPrix() +
            "}";
    }
}
