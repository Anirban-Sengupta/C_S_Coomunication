package Configuration;

import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import Model.HelloMessage;
import Model.HiGreeting;

@RestController
public class WebSocketController {
	
	@MessageMapping("/higreeting")
	@SendTo("/topic/higreeting")
	public HiGreeting greeting(HelloMessage message) throws Exception {
		//Thread.sleep(1000);
		return new HiGreeting ("Hi");
		//return new HiGreeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
	}
	
//	@MessageMapping("/news")
//	@SendTo("/topic/news")
//	public String broadcastNews(@Payload String message) {
//	  return message;
//	}
	
//	@MessageMapping("/news")
//	public void broadcastNews(@Payload String message) {
//	  this.simpMessagingTemplate.convertAndSend("/topic/news", message)         Using simpMessagingTemplate instead of @SendTo annotation
//	}
}
