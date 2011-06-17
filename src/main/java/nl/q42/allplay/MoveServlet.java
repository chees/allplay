package nl.q42.allplay;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MoveServlet extends HttpServlet {

	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("id");
		int dir = Integer.parseInt(request.getParameter("dir"));
		
		State state = Game.getState();
		state.move(id, dir);
	}
}
