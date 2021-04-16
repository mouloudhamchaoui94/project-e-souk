package services.sellerService.controllers;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.Column;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import services.sellerService.models.Seller;
import services.sellerService.repositories.SellerRepositoryI;

@RestController
public class SellerController {

	@Autowired
	private SellerRepositoryI sellerR;
	
	@GetMapping(value = "/seller/all")
	public List<Seller> listProducts() {
		return sellerR.findAll();
	}
	
	@GetMapping(value = "/seller/{id}")
	public Seller sellerById(@PathVariable int id) {
		Optional<Seller> s = sellerR.findById(id); 
		Seller seller = null;
		if(s.isPresent()) {
			seller = s.get();
		}
		System.out.println("----------------- "+s);
		
		return seller;
	}
	
	
	
	@RequestMapping(value="/seller/create",method = RequestMethod.POST) 
    public void createSeller( @RequestBody Map<String,Object> body) {
		
		
		Seller seller = new Seller(
				body.get("fstname").toString(), 
				body.get("famname").toString(), 
				body.get("birthday").toString(),
				body.get("address").toString(),
				body.get("iban").toString(),
				body.get("codeEntreprise").toString());
		
		sellerR.save(seller);
	}
	
	@DeleteMapping(value="/seller/delete/{id}")
	public void deleteUser(@PathVariable int id) {
		sellerR.deleteById(Integer.valueOf(id));
	}

}
