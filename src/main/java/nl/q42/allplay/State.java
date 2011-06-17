package nl.q42.allplay;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.codehaus.jackson.map.ObjectMapper;

// TODO check the synchronized stuff
// TODO use a real message queue for this?

public class State {
	private Map<String, Object> messages;
	private List<Map<String, Object>> msgList;
	
	public State() {
		messages = new HashMap<String, Object>();
		msgList = new ArrayList<Map<String, Object>>();
		messages.put("messages", msgList);
	}
	
	public synchronized String getMessages() {
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = "{}";
		try {
			jsonString = mapper.writeValueAsString(messages);
		} catch (Exception e) {
			e.printStackTrace();
		}
		msgList.clear();
		return jsonString;
	}
	
	public synchronized String createPlayer() {
		String id = UUID.randomUUID().toString();
		
		Map<String, Object> msg = new HashMap<String, Object>();
		msg.put("action", "createPlayer");
		msg.put("id", id);
		msgList.add(msg);
		 
		return id;
	}

	public synchronized void move(String id, int dir) {
		Map<String, Object> msg = new HashMap<String, Object>();
		msg.put("action", "move");
		msg.put("id", id);
		msg.put("dir", dir);
		msgList.add(msg);
	}
}
