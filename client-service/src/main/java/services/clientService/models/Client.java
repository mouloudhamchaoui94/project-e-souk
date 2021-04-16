package services.clientService.models;

import javax.persistence.*;

@Entity
@Table(name="client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;
    private String fstname;
    private String famname;
    private String birthday;
    private String address;
    private String iban;

    public Client( String fstname, String famname, String birthday, String address, String iban) {
        this.fstname = fstname;
        this.famname = famname;
        this.birthday = birthday;
        this.address = address;
        this.iban = iban;
    }
    public Client() {
    }

    public int getCid() {
        return cid;
    }

    public String getFstname() {
        return fstname;
    }

    public String getFamname() {
        return famname;
    }

    public String getBirthday() {
        return birthday;
    }

    public String getAddress() {
        return address;
    }

    public String getIban() {
        return iban;
    }

    public void setCid(int cid) {
        this.cid = cid;
    }

    public void setFstname(String fstname) {
        this.fstname = fstname;
    }

    public void setFamname(String famname) {
        this.famname = famname;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }
}
