package com.evolution.ediayma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.evolution.ediayma.web.rest.TestUtil;

public class ProduitsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Produits.class);
        Produits produits1 = new Produits();
        produits1.setId(1L);
        Produits produits2 = new Produits();
        produits2.setId(produits1.getId());
        assertThat(produits1).isEqualTo(produits2);
        produits2.setId(2L);
        assertThat(produits1).isNotEqualTo(produits2);
        produits1.setId(null);
        assertThat(produits1).isNotEqualTo(produits2);
    }
}
