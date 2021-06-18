// unnecessary code by grace he hi there
import java.util.*;
import java.io.*;
public class nhsdata
{
	public static void main(String args[]) throws IOException
	{
		BufferedReader br = new BufferedReader(new FileReader("spring_semester_data.txt"));
		//code to reset incoming senior member data
		//PrintWriter out = new PrintWriter(new File("spring_semester_data_blank"));
		String loop="";
		while(!loop.equals("Old Members"))
		{
			loop=br.readLine();
			//out.println(loop);
			System.out.println(loop);
		}
		loop = br.readLine();
		while(!loop.equals(""))
		{
			String current = loop;
			int required = 25;
			if(Integer.parseInt(current.substring(current.indexOf("sac")-1,current.indexOf("sac")))<3)
			{
				current = current.substring(0,current.indexOf("11g"))+"12g"+current.substring(current.indexOf("11g")+3, current.indexOf("11g")+6)+"0/25 0/5 0sac |";
				System.out.println(current);
			}
			else
				current = "";
			loop = br.readLine();
		}
		//out.close();
	}
}