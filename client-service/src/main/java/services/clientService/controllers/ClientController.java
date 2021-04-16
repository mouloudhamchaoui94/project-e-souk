package services.clientService.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import services.clientService.models.Client;
import services.clientService.repositories.ClientRepositoryI;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ClientController {

    @Autowired
    private ClientRepositoryI clientR;

    @GetMapping(value = "/client/all")
    public List<Client> listClient() {
        return clientR.findAll();
    }

    @GetMapping(value = "/client/{id}")
    public Client clientById(@PathVariable int id) {
        Optional<Client> s = clientR.findById(id);
        Client client = null;
        if(s.isPresent()) {
            client = s.get();
        }
        System.out.println("----------------- "+s);

        return client;
    }



    @RequestMapping(value="/client/create",method = RequestMethod.POST)
    public void createClient( @RequestBody Map<String,Object> body) {


        Client client = new Client(
                body.get("fstname").toString(),
                body.get("famname").toString(),
                body.get("birthday").toString(),
                body.get("address").toString(),
                body.get("iban").toString());

        clientR.save(client);
    }

    @DeleteMapping(value="/client/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        clientR.deleteById(Integer.valueOf(id));
    }

}
