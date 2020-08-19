package services.interfaces;

import javax.servlet.http.HttpServletRequest;

import beans.interfaces.SessionToken;
import util.Config;

/** Interface to provide full range Session handling. Includes
 *  creating, deleting and reading sessions.
 * @author Nikola
 */
public interface SessionHandler extends SessionTracker {
	
	public default void deleteSession(HttpServletRequest request) {
		request.setAttribute(Config.userSessionAttributeString, null);
	}
	
	public default void createSession(SessionToken obj, HttpServletRequest request) {
		request.setAttribute(Config.userSessionAttributeString, obj);
	}
}
