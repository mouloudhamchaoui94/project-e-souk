package services.productService.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import services.productService.models.Product;
import services.productService.repositories.ProductRepositoryI;

@RestController
public class ProductController {

	@Autowired
	private ProductRepositoryI productR;
	
	@GetMapping(value = "/product/all")
	public List<Product> listProducts() {
		return productR.findAll();
	}
	
	@GetMapping(value = "/product/{id}")
	public Product productById(@PathVariable int id) {
		Optional<Product> p = productR.findById(id); 
		Product product = null;
		if(p.isPresent()) {
			product = p.get();
		}
		
		return product;
	}
	
	@GetMapping(value = "/product/name/{name}")
	public List<Product> productByName(@PathVariable String name) {
		List<Product> products = productR.findByName(name); 	
		return products;
	}
	
	@GetMapping(value = "/product/category/{category}")
	public List<Product> productByCategory(@PathVariable String category) {
		List<Product> products = productR.findByCategory(category); 	
		return products;
	}
	
	@RequestMapping(value="/product/create",method = RequestMethod.POST) 
    public void createProduct( @RequestBody Map<String,Object> body) {
		
		Product product = new Product(
				Integer.parseInt(body.get("sid").toString()), 
				body.get("name").toString(), 
				body.get("category").toString(), 
				Integer.parseInt(body.get("qty").toString()),
				Double.parseDouble(body.get("price").toString()),
				body.get("imageURL").toString(),
				body.get("description").toString());
		
		productR.save(product);
	}
	
	@DeleteMapping(value="/product/delete/{id}")
	public void deleteProduct(@PathVariable int id) {
		productR.deleteById(Integer.valueOf(id));
	}
	
	@PutMapping(value="/product/update") 
	public void updateProduct(@RequestBody Map<String,Object> body) {
		
		int id = Integer.valueOf(body.get("pid").toString());
		Optional<Product> p = productR.findById(id);
		Product product = null;
		if(p.isPresent()) {
			product = p.get();
		}
		if(product != null) {
			if(body.get("sid") != null) product.setSid(Integer.valueOf(body.get("sid").toString()));
			if(body.get("name") != null) product.setName(body.get("name").toString());
			if(body.get("category") != null) product.setCategory(body.get("category").toString());
			if(body.get("qty") != null) product.setQty(Integer.valueOf(body.get("qty").toString()));
			if(body.get("price") != null) product.setPrice(Double.valueOf(body.get("price").toString()));
			if(body.get("imageURL") != null) product.setImageURL(body.get("imageURL").toString());
			if(body.get("description") != null) product.setDescription(body.get("description").toString());
			
			productR.save(product);
		}

	}

}
