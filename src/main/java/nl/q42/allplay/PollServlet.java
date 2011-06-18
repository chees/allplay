package nl.q42.allplay;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PollServlet extends HttpServlet {

	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		
		State state = Game.getState();
		String messages = state.getMessages();
		
		if(messages.equals("")) return;
		
		System.out.println(messages);
		out.println(messages);
	}
}
