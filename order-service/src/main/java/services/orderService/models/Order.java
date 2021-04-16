package services.orderService.models;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="orders")
public class Order implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int oid;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date odate;
    private int pid;
    private int cid;

    public Order() {
    }

    public Order( Date orderDate, int pid, int cid) {
        this.odate = orderDate;
        this.pid = pid;
        this.cid = cid;
    }

    public int getOid() {
        return oid;
    }

    public Date getOdate() {
        return odate;
    }

    public int getPid() {
        return pid;
    }

    public int getCid() {
        return cid;
    }

    public void setOid(int oid) {
        this.oid = oid;
    }

    public void setOdate(Date odate) {
        this.odate = odate;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public void setCid(int cid) {
        this.cid = cid;
    }
}