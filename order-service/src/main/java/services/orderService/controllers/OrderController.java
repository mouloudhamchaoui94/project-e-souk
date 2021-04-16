package services.orderService.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import services.orderService.models.Order;
import services.orderService.repositories.OrderRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping(value = "/order/all")
    public List<Order> orderList() {
        return orderRepository.findAll();
    }

    @GetMapping(value = "/order/{id}")
    public Order orderById(@PathVariable int id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        Order order = null;
        if (optionalOrder.isPresent()) {
            order = optionalOrder.get();
        }
        System.out.println("----------------- " + optionalOrder);
        return order;
    }

    @GetMapping(value = "/order/client/{cid}")
    public List<Order> orderByClient(@PathVariable int cid) {
        List<Order> orderList = orderRepository.findByCid(cid);
        return orderList;
    }


    @RequestMapping(value = "/order/create", method = RequestMethod.POST)
    public void createOrder(@RequestBody Map<String, Object> body) {
        Order order = null;
        try {
            order = new Order(new SimpleDateFormat("dd/MM/yyyy").parse(body.get("orderDate").toString()),
                    Integer.parseInt(body.get("sid").toString()),
                    Integer.parseInt(body.get("cid").toString()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        orderRepository.save(order);
    }

    @DeleteMapping(value = "/order/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        orderRepository.deleteById(Integer.valueOf(id));
    }

}
