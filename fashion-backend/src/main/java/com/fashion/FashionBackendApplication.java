package com.fashion;

import com.fashion.entity.Category;
import com.fashion.entity.User;
import com.fashion.repository.CategoryRepository;
import com.fashion.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class FashionBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FashionBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner setupDefaultData(UserRepository userRepository, CategoryRepository categoryRepository,
			PasswordEncoder passwordEncoder) {
		return args -> {
			if (userRepository.findByUsername("admin").isEmpty()) {
				User admin = new User(null, "admin", passwordEncoder.encode("12345"), "admin@fashion.com");
				userRepository.save(admin);
				System.out.println("Default user 'admin' with password '12345' created.");
			}

			// Check if any categories have a type assigned. If not, old data exists without
			// types.
			long mainCount = categoryRepository.findAll().stream().filter(c -> "MAIN".equals(c.getType())).count();

			if (mainCount == 0) {
				System.out.println("No categories with 'MAIN' type found. Re-seeding categories...");
				categoryRepository.deleteAll();
				List<Category> defaultCategories = Arrays.asList(
						// Main categories (from original Shopbycategory.jsx)
						new Category(null, "Kids Fashion",
								"https://img.freepik.com/free-photo/childhood-fun-leisure-lifestyle-concept_53876-125032.jpg",
								"Trendy kids wear", "MAIN"),
						new Category(null, "Western",
								"https://img.freepik.com/free-photo/fashion-portrait-young-elegant-woman_1328-2736.jpg",
								"Modern western styles", "MAIN"),
						new Category(null, "Kurtis",
								"https://img.freepik.com/free-photo/indian-woman-wearing-traditional-clothing_23-2148564070.jpg",
								"Ethnic kurtis", "MAIN"),
						new Category(null, "Pairs",
								"https://img.freepik.com/free-photo/horizontal-portrait-stylish-couple-suit-dress_171337-18338.jpg",
								"Perfect combos", "MAIN"),
						new Category(null, "Coord Sets",
								"https://img.freepik.com/free-photo/two-fashionable-women-sitting-together_23-2148766485.jpg",
								"Stylish coord sets", "MAIN"),
						new Category(null, "Dresses",
								"https://img.freepik.com/free-photo/beautiful-woman-pink-dress-posing-street_23-2148201509.jpg",
								"Elegant dresses", "MAIN"),

						// Men's categories (from original Shopformen.jsx)
						new Category(null, "Shirt",
								"https://img.freepik.com/free-photo/handsome-young-man-wearing-shirt_23-2148949515.jpg",
								"Classic shirts", "MEN"),
						new Category(null, "T-shirt",
								"https://img.freepik.com/free-photo/man-wearing-blank-white-t-shirt-clothing-shoot-set_53876-111287.jpg",
								"Casual t-shirts", "MEN"),
						new Category(null, "Kurta",
								"https://img.freepik.com/free-photo/young-indian-man-wearing-traditional-clothing_23-2149437149.jpg",
								"Ethnic men's wear", "MEN"),
						new Category(null, "Printed Shirt",
								"https://img.freepik.com/free-photo/man-wearing-floral-shirt-portrait_23-2148816738.jpg",
								"Modern printed shirts", "MEN"),
						new Category(null, "Sunglasses",
								"https://img.freepik.com/free-photo/close-up-portrait-young-man-sunglasses_23-2148883658.jpg",
								"Trendy sunglasses", "MEN"),
						new Category(null, "Wallet",
								"https://img.freepik.com/free-photo/man-taking-money-out-from-his-wallet_53876-14734.jpg",
								"Leather wallets", "MEN"),
						new Category(null, "Shoe",
								"https://img.freepik.com/free-photo/fashion-men-s-shoes-leather-style_1203-7557.jpg",
								"Men's footwear", "MEN"),
						new Category(null, "Leather belt",
								"https://img.freepik.com/free-photo/classic-black-leather-belt-with-buckle_1101-443.jpg",
								"Quality belts", "MEN"),
						new Category(null, "Watch",
								"https://img.freepik.com/free-photo/luxury-watch-wrist-man-suit_1157-30234.jpg",
								"Premium watches", "MEN"),

						// Women's categories (from original ShopForWomen.jsx)
						new Category(null, "Sunglass",
								"https://img.freepik.com/free-photo/close-up-portrait-beautiful-smiling-girl-sunglasses_158538-4034.jpg",
								"Stylish sunglasses", "WOMEN"),
						new Category(null, "Dress",
								"https://img.freepik.com/free-photo/young-beautiful-woman-pink-dress_1303-17637.jpg",
								"Elegant dresses", "WOMEN"),
						new Category(null, "Coordset",
								"https://img.freepik.com/free-photo/beautiful-girl-white-suit_1303-17632.jpg",
								"Trendy coord sets", "WOMEN"),
						new Category(null, "Western",
								"https://img.freepik.com/free-photo/fashion-portrait-young-elegant-woman_1328-2736.jpg",
								"Western wear", "WOMEN"),
						new Category(null, "Wallet",
								"https://img.freepik.com/free-photo/close-up-hand-holding-wallet_23-2149126631.jpg",
								"Stylish wallets", "WOMEN"),
						new Category(null, "Kurti Set",
								"https://img.freepik.com/free-photo/indian-woman-wearing-traditional-clothing_23-2148564070.jpg",
								"Modern kurti sets", "WOMEN"),
						new Category(null, "Belt",
								"https://img.freepik.com/free-photo/fashion-details-woman-wearing-stylish-belt_23-2148816735.jpg",
								"Fashionable belts", "WOMEN"),
						new Category(null, "Shoe",
								"https://img.freepik.com/free-photo/elegant-female-shoes-heels_23-2148201509.jpg",
								"Women's footwear", "WOMEN"),
						new Category(null, "Watch",
								"https://img.freepik.com/free-photo/fashionable-woman-white-watch-blue-shirt_114579-86665.jpg",
								"Elegant watches", "WOMEN"),

						// Kids' categories
						new Category(null, "Boy's Wear",
								"/assets/Boy_Fashion.jpg",
								"Trendy boys collection", "KIDS"),
						new Category(null, "Girl's Dress",
								"/assets/Girl_Dress.jpg",
								"Pretty dresses for girls", "KIDS"),
						new Category(null, "Boy's Coat",
								"/assets/boy_coat.jpg",
								"Elegant coats", "KIDS"),
						new Category(null, "Girl's Party",
								"/assets/Girl_Partywear.jpg",
								"Party wear for girls", "KIDS"),
						new Category(null, "Boy's Checked",
								"/assets/Boy_checkedShirt.jpg",
								"Casual checked shirts", "KIDS"),
						new Category(null, "Girl's Jumpsuit",
								"/assets/Girl_Jumpsuit.jpg",
								"Stylish jumpsuits", "KIDS"));
				categoryRepository.saveAll(defaultCategories);
				System.out.println("Default categories initialized with types.");
			}
			// Ensure KIDS categories are present
			long kidsCount = categoryRepository.findAll().stream().filter(c -> "KIDS".equals(c.getType())).count();
			if (kidsCount == 0) {
				System.out.println("KIDS categories missing. Seeding KIDS categories...");
				List<Category> kidsCategories = Arrays.asList(
						new Category(null, "Boy's Wear", "/assets/Boy_Fashion.jpg", "Trendy boys collection", "KIDS"),
						new Category(null, "Girl's Dress", "/assets/Girl_Dress.jpg", "Pretty dresses for girls",
								"KIDS"),
						new Category(null, "Boy's Coat", "/assets/boy_coat.jpg", "Elegant coats", "KIDS"),
						new Category(null, "Girl's Party", "/assets/Girl_Partywear.jpg", "Party wear for girls",
								"KIDS"),
						new Category(null, "Boy's Checked", "/assets/Boy_checkedShirt.jpg", "Casual checked shirts",
								"KIDS"),
						new Category(null, "Girl's Jumpsuit", "/assets/Girl_Jumpsuit.jpg", "Stylish jumpsuits",
								"KIDS"));
				categoryRepository.saveAll(kidsCategories);
			}
		};
	}

}
