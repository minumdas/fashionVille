package com.fashion.config;

import com.fashion.entity.Product;
import com.fashion.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

        @Autowired
        ProductRepository productRepository;

        @Override
        public void run(String... args) throws Exception {
                // Only seed if no products exist to avoid foreign key violations on cart items
                if (productRepository.count() == 0) {

                        if (true) {
                                Product p1 = new Product(null, "Women Style 1", 1200.0, "/images/dress.jpg", "WOMEN",
                                                "Elegant summer wear");
                                Product p2 = new Product(null, "Women Style 2", 1500.0, "/images/coordset.jpg", "WOMEN",
                                                "Casual daily wear");
                                Product p3 = new Product(null, "Women Style 3", 1800.0, "/images/dresses.jpg", "WOMEN",
                                                "Party wear dress");

                                Product m1 = new Product(null, "Men Casual", 1400.0, "/images/shirt1.jpg", "MEN",
                                                "Casual linen shirt");
                                Product m2 = new Product(null, "Men Formal", 1600.0, "/images/printed_shirt.jpg", "MEN",
                                                "Official formal wear");
                                Product m3 = new Product(null, "Men Jacket", 2000.0, "/images/pantshirt.jpg", "MEN",
                                                "Winter leather jacket");

                                Product h1 = new Product(null, "Kids Wear", 899.0, "/images/kidswear.jpg", "HOME",
                                                "Trendy kidswear for active play");
                                Product h2 = new Product(null, "Baby Collection", 599.0, "/images/kidswear1.jpg",
                                                "HOME",
                                                "Soft and cozy baby essentials");
                                Product h3 = new Product(null, "Girls Dress", 1299.0, "/images/dresses.jpg", "HOME",
                                                "Elegant dresses for special occasions");
                                Product h4 = new Product(null, "Teen Fashion", 1499.0, "/images/Teenwear.jpg", "HOME",
                                                "Stay trendy with latest teen styles");
                                Product h5 = new Product(null, "Pant & Shirt", 1899.0, "/images/Pairs.jpg", "HOME",
                                                "Classic combinations for every day");

                                // Kids specific products - BOYS
                                Product b1 = new Product(null, "Boy Dress Set", 1299.0, "/assets/Boy_Dressset.jpg",
                                                "KIDS", "Stylish dress set for boys");
                                Product b2 = new Product(null, "Boy Fashion Suit", 1599.0, "/assets/Boy_Fashion.jpg",
                                                "KIDS", "Trendy fashion suit");
                                Product b3 = new Product(null, "Pant & Shirt Set", 999.0, "/assets/Boy_PantShirt.jpg",
                                                "KIDS", "Casual pant and shirt");
                                Product b4 = new Product(null, "Checked Shirt", 599.0, "/assets/Boy_checkedShirt.jpg",
                                                "KIDS", "Cool checked shirt");
                                Product b5 = new Product(null, "Boy Coat", 1899.0, "/assets/boy_coat.jpg", "KIDS",
                                                "Elegant coat for special occasions");

                                // Kids specific products - GIRLS
                                Product g1 = new Product(null, "Girl Dress", 1199.0, "/assets/Girl_Dress.jpg", "KIDS",
                                                "Beautiful summer dress");
                                Product g2 = new Product(null, "Pink Frock", 1399.0, "/assets/Girl_Frock.jpg", "KIDS",
                                                "Lovely pink frock");
                                Product g3 = new Product(null, "Girl Jumpsuit", 899.0, "/assets/Girl_Jumpsuit.jpg",
                                                "KIDS", "Comfortable jumpsuit");
                                Product g4 = new Product(null, "Masha Frock", 1499.0, "/assets/Girl_MashaFrock.jpg",
                                                "KIDS", "Trendy Masha style frock");
                                Product g5 = new Product(null, "Party Wear", 1999.0, "/assets/Girl_Partywear.jpg",
                                                "KIDS", "Elegant party wear for girls");

                                productRepository.saveAll(Arrays.asList(p1, p2, p3, m1, m2, m3, h1, h2, h3, h4, h5, b1,
                                                b2, b3, b4, b5, g1, g2, g3, g4, g5));
                                System.out.println(
                                                "Data Seeding Completed for Products (Women, Men, Home, Kids - Boys & Girls)");
                        }
                }
                // Ensure KIDS products are present
                long kidsProductCount = productRepository.findAll().stream().filter(p -> "KIDS".equals(p.getCategory()))
                                .count();
                if (kidsProductCount == 0) {
                        System.out.println("KIDS products missing. Seeding KIDS products...");
                        // Kids specific products - BOYS
                        Product b1 = new Product(null, "Boy Dress Set", 1299.0, "/assets/Boy_Dressset.jpg", "KIDS",
                                        "Stylish dress set for boys");
                        Product b2 = new Product(null, "Boy Fashion Suit", 1599.0, "/assets/Boy_Fashion.jpg", "KIDS",
                                        "Trendy fashion suit");
                        Product b3 = new Product(null, "Pant & Shirt Set", 999.0, "/assets/Boy_PantShirt.jpg", "KIDS",
                                        "Casual pant and shirt");
                        Product b4 = new Product(null, "Checked Shirt", 599.0, "/assets/Boy_checkedShirt.jpg", "KIDS",
                                        "Cool checked shirt");
                        Product b5 = new Product(null, "Boy Coat", 1899.0, "/assets/boy_coat.jpg", "KIDS",
                                        "Elegant coat for special occasions");

                        // Kids specific products - GIRLS
                        Product g1 = new Product(null, "Girl Dress", 1199.0, "/assets/Girl_Dress.jpg", "KIDS",
                                        "Beautiful summer dress");
                        Product g2 = new Product(null, "Pink Frock", 1399.0, "/assets/Girl_Frock.jpg", "KIDS",
                                        "Lovely pink frock");
                        Product g3 = new Product(null, "Girl Jumpsuit", 899.0, "/assets/Girl_Jumpsuit.jpg", "KIDS",
                                        "Comfortable jumpsuit");
                        Product g4 = new Product(null, "Masha Frock", 1499.0, "/assets/Girl_MashaFrock.jpg", "KIDS",
                                        "Trendy Masha style frock");
                        Product g5 = new Product(null, "Party Wear", 1999.0, "/assets/Girl_Partywear.jpg", "KIDS",
                                        "Elegant party wear for girls");

                        productRepository.saveAll(Arrays.asList(b1, b2, b3, b4, b5, g1, g2, g3, g4, g5));
                }
        }
}
