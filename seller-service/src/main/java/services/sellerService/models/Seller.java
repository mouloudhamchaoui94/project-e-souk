package services.sellerService.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity @Table(name="seller")
public class Seller {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int sid;
	private String fstname;
	private String famname;
	private String birthday;
	private String address;
	private String iban;
	@Column(name="code_entreprise")
	private String codeEntreprise;
	

	public Seller() {
	}


	public Seller(String fstname, String famname, String birthday, String address, String iban, String codeEntreprise) {
		super();
		this.fstname = fstname;
		this.famname = famname;
		this.birthday = birthday;
		this.address = address;
		this.iban = iban;
		this.codeEntreprise = codeEntreprise;
	}

	public int getSid() {
		return sid;
	}

	public String getFstname() {
		return fstname;
	}


	public void setFstname(String fstname) {
		this.fstname = fstname;
	}


	public String getFamname() {
		return famname;
	}


	public void setFamname(String famname) {
		this.famname = famname;
	}


	public String getBirthday() {
		return birthday;
	}


	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getIban() {
		return iban;
	}


	public void setIban(String iban) {
		this.iban = iban;
	}


	public String getCodeEntreprise() {
		return codeEntreprise;
	}


	public void setCodeEntreprise(String codeEntreprise) {
		this.codeEntreprise = codeEntreprise;
	}



}
