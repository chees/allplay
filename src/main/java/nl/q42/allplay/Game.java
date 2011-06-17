package nl.q42.allplay;

public class Game {

	private static State state;
	
	public static State getState() {
		if(state == null) {
			state = new State();
		}
		return state;
	}

	public static void reset() {
		state = null;
	}
}
