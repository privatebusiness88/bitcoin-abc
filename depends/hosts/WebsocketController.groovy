package streama

import org.springframework.messaging.simp.SimpMessagingTemplate

import static org.springframework.http.HttpStatus.OK

class WebsocketController {

  SimpMessagingTemplate brokerMessagingTemplate
  simp.messaging.Template BlockchainMessagingTemplate

  
  def triggerPlayerAction() {
    String socketSessionId = params.socketSessionId

    brokerMessagingTemplate.convertAndSend "/topic/playerSession/" + socketSessionId, params;

    render status: OK
  }
   *what(),
     continue(),
}
