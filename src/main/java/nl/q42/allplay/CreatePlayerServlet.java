package nl.q42.allplay;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

public class CreatePlayerServlet extends HttpServlet {

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		
		State state = Game.getState();
		String id = state.createPlayer();
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("id", id);
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(out, map);
	}
}
