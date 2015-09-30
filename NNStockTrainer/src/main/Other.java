package main;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Implementation for writing the stock information into MySQL.
 * 
 * @author cseibert 
 */
public class Other
{
	
	public static void main(String[] args) throws SQLException, JsonGenerationException, JsonMappingException, IOException {
		
		Connection theConnection = null;  
		
        try 
        {  
            Class.forName("com.mysql.jdbc.Driver");  
            theConnection = DriverManager.getConnection("jdbc:mysql://localhost/stocked?user=root&password=itisag00ddayt0die9921");  
        }
        catch (Exception e) 
        {  
            e.printStackTrace();  
        } 

		PreparedStatement statement = theConnection.prepareStatement("SELECT * FROM entries");
		ResultSet results = statement.executeQuery();
		HashMap<String, ArrayList<Entry>> map = new HashMap<>();
		while (results.next()) {
			// TODO: Append each symbol to a hash map so that we can look up all of the entries for a particular symbol	
			double close = results.getInt("close");
			String symbol = results.getString("symbol");
			String date = results.getString("date");
			if (!map.containsKey(symbol)) {
				map.put(symbol, new ArrayList());	
			}
			Entry e = new Entry();
			e.close = close;
			e.date = date;
			map.get(symbol).add(e);
		}
		
		// TODO: Order by dates
		Iterator<String> iter = map.keySet().iterator();
		while (iter.hasNext()) {
			String symbol = iter.next();
			ArrayList<Entry> entries = map.get(symbol);
			Collections.sort(entries, new Comparator<Entry>() {
				@Override
				public int compare(Entry o1, Entry o2)
				{
					return o2.date.compareTo(o1.date);
				}
			});
		}
		
		// Generator derivatives
		int SKIP = 10;
		iter = map.keySet().iterator();
		while (iter.hasNext()) {
			String symbol = iter.next();
			ArrayList<Entry> entries = map.get(symbol);
			ArrayList<Entry> derivatives = new ArrayList<>();
			for (int i = 0; i + SKIP < entries.size(); i += SKIP) {
				entries.get(i);
				double x1 = entries.get(i).close;
				double x2 = entries.get(i + SKIP).close;
				Entry e = new Entry();
				e.close = (x2 - x1) / x1;
				e.date = entries.get(i).date;
				derivatives.add(e);
			}
			map.put(symbol, derivatives); 
		}
		
		// Write the data to a file
		ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(new File("stocks.json"), map);
		
	}
	
	public static class Entry{
		public double close;
		public String date;
	}
}
