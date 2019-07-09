module.exports = {

url: "https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudentResult.htm",

header: { headers: { "Content-Type": "application/x-www-form-urlencoded" }}, 

postRequest: { selectedTerm: 'FA19',
     xsoc_term: '',
     loggedIn: 'false',
     tabNum: 'tabs-crs',
     _selectedSubjects: '1',
     schedOption1: 'true',
     _schedOption1: 'on',
     _schedOption11: 'on',
     _schedOption12: 'on',
     schedOption2: 'true',
     _schedOption2: 'on',
     _schedOption4: 'on',
     _schedOption5: 'on',
     _schedOption3: 'on',
     _schedOption7: 'on',
     _schedOption8: 'on',
     _schedOption13: 'on',
     _schedOption10: 'on',
     _schedOption9: 'on',
     schDay:'M', 
     _schDay:'on', 
     schDay:'T', 
     _schDay:'on', 
     schDay:'W', 
     _schDay:'on', 
     schDay:'R', 
     _schDay:'on', 
     schDay:'F', 
     _schDay:'on', 
     schDay:'S', 
     _schDay:'on', 
     schStartTime: '12:00',
     schStartAmPm: '0',
     schEndTime: '12:00',
     schEndAmPm: '0',
     _selectedDepartments: '1',
     schedOption1Dept: 'true',
     _schedOption1Dept: 'on',
     _schedOption11Dept: 'on',
     _schedOption12Dept: 'on',
     schedOption2Dept: 'true',
     _schedOption2Dept: 'on',
     _schedOption4Dept: 'on',
     _schedOption5Dept: 'on',
     _schedOption3Dept: 'on',
     _schedOption7Dept: 'on',
     _schedOption8Dept: 'on',
     _schedOption13Dept: 'on',
     _schedOption10Dept: 'on',
     _schedOption9Dept: 'on',
     schDayDept:'M', 
     _schDayDept:'on', 
     schDayDept:'T', 
     _schDayDept:'on', 
     schDayDept:'W', 
     _schDayDept:'on', 
     schDayDept:'R', 
     _schDayDept:'on', 
     schDayDept:'F', 
     _schDayDept:'on', 
     schDayDept:'S', 
     _schDayDept:'on', 
     schStartTimeDept: '12:00',
     schStartAmPmDept: '0',
     schEndTimeDept: '12:00',
     schEndAmPmDept: '0',
     sections: '',
     instructorType: 'begin',
     instructor: '',
     titleType: 'contain',
     title: '',
     _hideFullSec: 'on',
     _showPopup: 'on' }, 

tempString: `

<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="initial-scale=1">
<meta name="format-detection" content="telephone=no">


<title>Student/Class Info</title>
<link rel="stylesheet" href="//www.ucsd.edu/common/cwp/active-cherry/base-min.css" />
<style type="text/css">
#tdr_banner {
	background: transparent url(//students.ucsd.edu/_resources/current_students/css/images/triton-banner.png) center top no-repeat;
	height: 52px;
	margin: 0 auto;
	max-width: 960px;
	width: 98%;
}

body.fluid #tdr_banner {
	max-width: none;
}
</style>
<style type="text/css">
#tdr_nav ul #current_students_nav a {
	background: transparent url(//students.ucsd.edu/_resources/student_global/css/images/current_students_primary_nav.png) 2px 0 no-repeat;
	background-color: #E3EDF8;
    background-color: rgba(255, 255, 255, 0.4);
    text-indent: -9999px;
    width: 94px;
}

#tdr_nav ul #current_students_nav a:hover {
	background-color: #fff;
    background-color: rgba(255, 255, 255, 0.8);
}

@media only screen and (max-width: 768px) {
	#tdr_nav ul #current_students_nav a {
		width: auto;
	}
}
</style>
<script src="//www.ucsd.edu/common/cwp/active-cherry/base-min.js"></script>
<script src="//www.ucsd.edu/common/_emergency-broadcast/message.js"></script>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">



	
	
    <script type="text/javascript" src="/scheduleOfClasses/js/submit_form.js"></script>
    
<meta name="webapp.name" content="Instruction Tools" />
<meta name="webapp.url" content="http://blink.ucsd.edu/instructors/index.html" />
<meta name="display.crumbs" content="none" />
<meta name="display.search" content="none" />

<link href="/scheduleOfClasses/css/sch_classes.css" type="text/css" rel="stylesheet" media="all" />
<link href="//www.ucsd.edu/common/cwp/active-cherry/lib/jquery.dataTables-1.9.0/jquery.dataTables-min.css" media="all" rel="stylesheet" type="text/css" />
<link href="//www.ucsd.edu/common/cwp/active-cherry/lib/jquery-ui-1.8.18/jquery-ui-min.css" media="all" rel="stylesheet" type="text/css" />

<script src="//www.ucsd.edu/common/cwp/active-cherry/lib/jquery-ui-1.8.18/jquery-ui-min.js" type="text/javascript"></script>
<script src="//www.ucsd.edu/common/cwp/active-cherry/lib/jquery.dataTables-1.9.0/jquery.dataTables-min.js" type="text/javascript"></script>
<style type="text/css">
td.brdr {
    border-bottom-style:solid;
	border-bottom-width:1px;
	border-bottom-color:#D0D0D0;
}
td.ubrdr {
    border-top-style:solid;
	border-top-width:1px;
	border-top-color:#D0D0D0;
}
table.tbrdr{
	border-style:solid;
	border-width:1px;
	border-color:#D0D0D0;
</style>

</head>

<body
	
	>

	




<!-- env -->

<!-- emergency -->
<div id="uc-emergency"></div>
<!-- skip to content -->
<a class="skip-link" href="#tdr_content">Skip to content</a>
<!-- login -->

<div id="tdr_login" style="display: none"></div>
<script type="text/javascript">
(function($) {
    $(document).ready(function() {
        $.ajax({
            url: "https://a4.ucsd.edu/tritON/resources/bugscript.jsp?target=https%3A%2F%2Fwww.ucsd.edu&jsoncallback=?",
            dataType: 'jsonp',
            jsonpCallback: 'a4sso',
            success: function(data) {
                if (data.eduUcsdActLoggedin) {
                    var url = "<div id=\"tdr_login_content\">You are logged in | <a href=\"/security/student/logout?url=";
                    url += "http://students.ucsd.edu";
                    url += "\">Log Out</a></div>";
                    $("#tdr_login").empty();
                    $("#tdr_login").append(url);
                    $("#tdr_login").attr("style", "display:block");
                }
            },
            error: function(jqXHR, textStatus) {
                console.log("error trying to communicate with a4 sso: " + textStatus);
            }
        });
    });
})(jQuery);
</script>


	<!-- title -->
	<div id="tdr_title">
		<div id="tdr_title_content">
			<a id="tdr_title_ucsd_title" href="http://www.ucsd.edu">UC San Diego</a>
			<div id="tdr_title_page_title">
				<a href="/myTritonlink20">My TritonLink</a>
			</div>
			<a id="tdr_title_search_link" class="search-button" style="display: none">Search</a>
            <a id="tdr_title_menu_link">Menu</a>
		</div>
	</div>
<!-- $Id: academic-student-current.jsp 1066 2019-06-11 16:58:13Z devhar $ -->
<div id="tdr_nav" style="display: ">
    <div id="tdr_nav_content">
        <ul id="tdr_nav_list">
            <li id="current_students_nav"><a href="http://tritonlink.ucsd.edu">TritonLink</a></li>
            <li><span>Advising &amp; Grades</span>
                <ul>
                    <li><a href="/cgi-bin/tritonlink.pl/7/students/transcripts/academic_history.pl">Academic History</a></li>
                    <li><a href="https://myccr.ucsd.edu/home.htm">Co-Curricular Record</a></li>
                    <li><a href="/studentDars/select">Degree Audit</a></li>
                    <li><a href="http://ucsd.edu/catalog/">General Catalog</a></li>
                    <li><a href="/studentGpa/gpa">GPA Calculator</a></li>
                    <li><a href="/studentMajorMinorChange/majorminorchange">Major &amp; Minor</a></li>
                    <li><a href="http://real.ucsd.edu">REAL Portal</a></li>
                    <li><a href="/studentETranscript/order.htm">Order Official Documents</a></li>
                    <li><a href="http://vac.ucsd.edu">Virtual Advising Center</a></li>
                </ul></li>
            <li><span>Classes &amp; Enrollment</span>
                <ul>
                    <li><a href=" https://academicaffairs.ucsd.edu/Modules/Students/PreAuth">Enrollment Authorization System (EASy)</a></li>
                    <li><a href="/studentHolds/holds">Holds</a></li>
                    <li><a href="/cgi-bin/tritonlink.pl/6/students/academic/classes/schedule_of_classes.pl">Schedule of Classes</a></li>
                    <li><a href="http://coursefinder.ucsd.edu">TritonEd/Canvas</a></li>
                    <li><a href="/webreg2">WebReg</a></li>
                </ul></li>
            <li><span>Financial Tools</span>
                <ul>
                    <li><a href="/studentEBill/StudentBilling">Billing and Payment</a></li>
                    <li><a href="/studentDirectDeposit/DirectDeposit">Students Direct Deposit</a></li>
                    <li><a href="/studentFinancialAward/entry">Financial Aid</a></li>
                    <li><a href="/studentHealthWaiver/waiver">Health Fee Waiver</a></li>
                    <li><a href="/studentHealthWaiver/raft">RAFT</a></li>
            		<li><a href="https://ucsd-transportation.t2hosted.com/Account/Portal">Parking Permits</a></li>
                    <li><a href="/cgi-bin/tritonlink.pl/5/students/finances/residency/student_residency.pl">Residency for Tuition Purposes</a></li>
                </ul>
            </li>
            <li><span>Personal Tools</span>
                <ul>
                    <li><a href="/studentAddresses/addresses">Addresses</a></li>
                    <li><a href="/studentAddresses/infoRestrictions">Public Information Restriction</a></li>
                    <li><a href="/studentAddresses2/socialIdentities">Social Identities</a></li>
                    <li><a href="https://ucsd.joinhandshake.com">Handshake</a></li>
                </ul></li>
            <li><span>Student Forms</span>
                <ul>
                    <li><a href="http://students.ucsd.edu/finances/financial-aid/forms/">Financial Aid Forms</a></li>
                    <li><a href="http://students.ucsd.edu/my-tritonlink/forms/">All Forms</a></li>
                </ul>
            </li>
            <li><span>Help</span>
                <ul>
                    <li><a href="http://www.ucsd.edu/current-students/my-tritonlink/tools/tool-help/index.html">MyTritonLink Tools Help</a></li>
                    <li><a href="//act.ucsd.edu/cwp/feedback/help/tritonlink"
                        onclick="window.open('//act.ucsd.edu/cwp/feedback/help/tritonlink', 'DYGWYW', 'menubar=0,resizable=1,scrollbars=1,width=450,height=650');" target="DYGWYW">Request Assistance</a>
                    </li>
                </ul>
            </li>
            
        </ul>
    </div>
</div>
<div id="tdr_search" style="display: none">
    <div id="tdr_search_content">
        <form action="//act.ucsd.edu/cwp/tools/search-redir" method="get">
            <label for="search-scope">Search</label> <select id="search-scope" name="search-scope">
                <option selected="selected" value="tritonlink">This Site</option>
                <option value="default_collection">All UCSD Sites</option>
                <option value="faculty-staff">Faculty/Staff Directory</option>
            </select> <label for="search-term" id="search-term-label">Search Term</label> <input type="search" id="search-term" name="search-term" size="20" /> <input type="submit" class="search-button" value="Search" />
        </form>
    </div>
</div>
<div id="tdr_banner"
	style="display: block"></div>
<div id="tdr_crumbs" style="display: none">
	<div id="tdr_crumbs_content"></div>
</div>
<div id="tdr_content" class="tdr_fonts itag_webapp">
	<div id="tdr_content_content">
		<!-- $Id: schedule-of-classes-student-result.jsp 279 2016-05-17 16:32:03Z ssekar $ -->




<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">


	<div>
		<h1>Schedule of Classes </h1>

		<form id="socDisplayCVO" action="/scheduleOfClasses/scheduleOfClassesStudentResult.htm" method="post">
			
			
			  <input type="hidden" id="loggedIn" name="loggedIn" value="false"/>
			  
			 <div class="msg confirm">
						Your search was : 
						<br>
						<ul>
							
							<li>Term
								<ul>
									<li>Fall Quarter 2019  </li>
								</ul>
							</li>
						</ul>
						
						
						<ul>	
							
							
						</ul>
						
						
						<ul>
							
							
						</ul>
						 
						 
						 <ul>	
							
							
						  </ul>
						  
						  
						  <ul>	
							
							
						  </ul>
						  
						  
						  <ul>
							
							
						   </ul>
						   
						   
						   <ul>
							
							
						   </ul>
						   
						   
						   <ul>
							
							
						   </ul>
						   
						   
						   <ul>
							
								
								
									<li>Subject is CSE  - Computer Science &amp; Engineering
									
										<ul>
											<li>
													
														Course number is between
													
													
												
												<ul> 
													<li>100 and 100ZZ </li>
												</ul>
											</li>
										</ul>
										
									</li>
								
							
						   </ul>
						   <ul>
							
							
						   </ul>
						   <ul>
							
							
						</ul>
					</div>
					
					
		
		
		
				
			<div>
			 <table width="100%">
			 	<tbody>
				     <tr>
				     	<td align="left"><a href="/scheduleOfClasses/scheduleOfClassesStudent.htm">Start a new search</a></td>
				     	<td align="center"><a href="/scheduleOfClasses/scheduleOfClassesStudentResultPrint.htm">Printer Friendly</a></td>
				        <td align="right">
				        	Page  (1&nbsp;of&nbsp;1) &nbsp;
							
				
				            
				                
				                    
				                        1&nbsp;
				                    
				                    
				                
				            
						 
						    
					    </td>
				    </tr>
				 </tbody>
			 </table>
			</div>
			<br>
				<table  width="100%" class="tbrdr">
					<thead>
						
					</thead>
					
						
							
							
								
									<tr>
										<td colspan="13">
											<br>
											<h2> <span class="centeralign">Computer Science &amp; Engineering     </span> </h2>
											
												<br>
												 CSE CONTACT: CSE Advisors at csestudent@eng.ucsd.edu,
 CSE Building Room 1200. / Check your @ucsd.edu email
 for course and enrollment announcements. Exceptions
 will not be made for students who fail to receive or
 read their UCSD email. / PREREQUISITES ARE ENFORCED IN
 ALL COURSES: For additional prerequisite information,
 visit the Courses Pages for Undergraduate Education:
 http://cse.ucsd.edu/undergraduate/courses

											 
										</td>
									</tr>
								
					
								
								
													
					
						
								
								
						
								
								
							
								
								
							
							
								
							
						
							
							
								
					
								
								
													
					
									<tr>
										<td colspan="13">
											<br>
											<h2>  <span class="centeralign">Computer Science &amp; Engineering (CSE  )</span> </h2>
											 
											<span class="centeralign"><span class="bold_text">As of: 07/06/2019, 06:54:00</span></span>
											<br><br>
										</td>
									</tr>
								
						
								
								
						
								
								
							
								
								
							
							
								
							
						
							
							
								
					
								
								
													
					
						
								
								
						
								
								
									<tr >
										<td class="ubrdr" rowspan="2" >R
										<br>
										<span onmouseover="" style="cursor: pointer;" class="icon info" onclick="javascript:openNewWindow('http://registrar.ucsd.edu/StudentLink/rstr_codes.html', 'info')" title="info"></span></a></td>
										<td class="ubrdr"  rowspan="2" >Course Number</td>
										<td class="ubrdr"  rowspan="2" >Section ID<br><span onmouseover="" style="cursor: pointer;"  class="icon info" onclick="javascript:openNewWindow('http://registrar.ucsd.edu/StudentLink/id_crse_codes.html', 'info')" title="info"></span></td>
										<td class="ubrdr"  rowspan="2" >Meeting Type<br><span onmouseover="" style="cursor: pointer;" class="icon info" onclick="javascript:openNewWindow('http://registrar.ucsd.edu/StudentLink/instr_codes.html', 'info')" title="info"></span></td>
										<td class="ubrdr"  rowspan="2" >Section</td>
										<td class="ubrdr"  rowspan="2" >Days</td>
										<td class="ubrdr"  rowspan="2" >Time</td>
										<td class="ubrdr"  rowspan="2" colspan="2" >Building & Room<br><span onmouseover="" style="cursor: pointer;" class="icon info" onclick="javascript:openNewWindow('http://registrar.ucsd.edu/StudentLink/bldg_codes.html', 'info')" title="info"></span></td>
										<td class="ubrdr"  rowspan="2" >Instructor</td>
										<td class="ubrdr"  colspan="2" >Seats<span onmouseover="" style="cursor: pointer;" class="icon info" onclick="javascript:openNewWindow('http://registrar.ucsd.edu/StudentLink/avail_limit.html', 'info')" title="info"></span></td>
										<td class="ubrdr"  rowspan="2" >&nbsp;</td>
									</tr>
									<tr>
									  
										<td class="ubrdr" >Available</td>
										<td class="ubrdr" >Limit</td>
									</tr>
								
							
								
								
							
							
								
							
						
							
							
								
					
								
								
													
					
						
								
								
						
								
								
							
								
								
							
							
								
									
										
											<tr >
												<td class="crsheader"></td>	
												<td class="crsheader" align="">100</td>
												<td colspan="11" class="crsheader">
													Advanced Data Structures      
													
												</td>
											</tr>
											<tr>
												<td  class="nonenrtxt" colspan="2" align="right"></td>
												<td  class="nonenrtxt" colspan="11">
													<span class="ertext"> CSE 100 is equivalent to MATH 176.
</span>
												</td>
											</tr>
										
										
									
							
								
								
								
								
								
								
								
								
								
								
							
						
							
							
								
					
								
								
													
					
						
								
								
						
								
								
							
								
								
							
							
								
									
										
										
											
												
												
													
													<tr>
													   
															
																<td class="crsheader">
																	
																			<span id="crsRestCd" title="Open to Freshmen Only">
																			FR</span><br>
																	
																			<span id="crsRestCd" title="Open to Juniors Only">
																			JR</span><br>
																	
																			<span id="crsRestCd" title="Open to Sophomores Only">
																			SO</span><br>
																		
																		</td>								
																<td class="crsheader">100</td>
															
															 
														
														<td  class="crsheader" colspan="5">
															
																
																
																
															
																
																	
																	
																	
																	
																	
																	
																	
																	
																	
																		
																	
																	
																
															
															
															
																
																	<a href="javascript:openNewWindow('http://www.ucsd.edu/catalog/courses/CSE.html#cse100')"><span class="boldtxt">Advanced Data Structures      </span> </a>
																
																
																
															
															( 4
															
															Units)
															<br>
															                              
															
															
														</td>
														<td  class="crsheader" colspan="6" align="right">
														<span class="boldtxt" onmouseover="" style="cursor: pointer;" onclick="JavaScript:openNewWindow('/scheduleOfClasses/scheduleOfClassesPreReq.htm?termCode=FA19&courseId=CSE100   ');"> Prerequisites  </span> &nbsp;|&nbsp;
														<span class="boldtxt" onmouseover="" style="cursor: pointer;" onclick="javascript:openNewWindow('http://courses.ucsd.edu/coursemain.asp?section=983802')">Resources</span>&nbsp;|&nbsp;
														<span class="boldtxt" onmouseover="" style="cursor: pointer;" onclick="javascript:openNewWindow('http://cape.ucsd.edu/responses/Results.aspx?courseNumber=CSE+100','CAPE')"><span title="CAPE - Course and Professor Evaluations">Evaluations</span></span></td>
													</tr>
												
											
										
									
							
								
								
								
								
								
								
								
								
								 
									
											
									
												
													
														<tr class="sectxt">
															<td class="brdr" border="0"></td>
															<td class="brdr">
																
															</td>					
															<td class="brdr">
																
															</td>
															<td class="brdr"><span id="insTyp" title="Lecture">LE</span></td>
															<td class="brdr">A00</td>
															
															
																
																
																	
																		
																		
																			<td class="brdr">MWF    </td>
																			<td class="brdr">9:00a-9:50a</td>
																			<td class="brdr">PRICE</td>
																			<td class="brdr">THTRE</td>
																		
																	
																	
																		
																			<td class="brdr">
																						
																						
																							
																								
																									<a href='mailto:dsahoo@ucsd.edu'>Sahoo, Debashis                    </a>
																								
																								
																							
																							<br>
																						
																					
																					
																				
																			</td>
																			
																			    
																				 	<td  class="brdr"><span class="ertext">&nbsp;</span></td>
																					<td  class="brdr"><span class="ertext">&nbsp;</span></td>
																			    
																			    
																			     
																			    
																			
																			
																			    
																				 	<td  class="brdr"><span class="ertext">&nbsp;</span></td>
																			    
																			    
																			
																		
																		
																	
																
															
														</tr>	
														
													
													
												
											
									
												
													
														<tr class="sectxt">
															<td class="brdr" border="0"></td>
															<td class="brdr">
																
															</td>					
															<td class="brdr">
																
																	
																		
																		
																			983803
																		
																	 
																
															</td>
															<td class="brdr"><span id="insTyp" title="Discussion">DI</span></td>
															<td class="brdr">A01</td>
															
															
																
																
																	
																		
																		
																			<td class="brdr">Tu      </td>
																			<td class="brdr">6:30p-7:20p</td>
																			<td class="brdr">CENTR</td>
																			<td class="brdr">101  </td>
																		
																	
																	
																		
																			<td class="brdr">
																						
																						
																							
																								
																									<a href='mailto:dsahoo@ucsd.edu'>Sahoo, Debashis                    </a>
																								
																								
																							
																							<br>
																						
																					
																					
																				
																			</td>
																			
																			    
																			    
																			     
																			    
																					<td class="brdr">6</td>
																					<td class="brdr">200</td>
																			    
																			
																			
																			    
																			    
																					<td class="brdr"><span onmouseover="" style="cursor: pointer;" onclick="JavaScript:openNewWindow('https://ucsdbkst.ucsd.edu/wrtx/TextSearch?section=983803&term=FA19&subject=CSE &course=100','bookstore');">
																						<img src="/scheduleOfClasses/images/book.gif" height="20" width="20"/>
																						</span>
																					</td>	
																				
																			
																		
																		
																	
																
															
														</tr>	
														
													
													
												
											
									
												
													
													
														<tr class="nonenrtxt">
														<td  class="brdr" colspan="2" border="0"></td>
																				
														<td class="brdr">
															
														</td>
														<td class="brdr"><span id="insTyp" title="Final">FI</span></td>
														<td class="brdr">12/11/2019</td>
														
														
															
															
																
																	
																	
																		<td class="brdr">W      </td>
																		<td class="brdr">8:00a-10:59a</td>
																		<td class="brdr">TBA</td>
																		<td class="brdr">TBA</td>
																	
																
																
																		<td class="brdr">
																				
																				
																					
																				
																			
																		</td>
																	
																		
																	
																		<td  class="brdr" colspan="3">&nbsp;</td>
																	
																
															
														
													</tr>	
													
													
												
											
										
									
								
							
						
							
							
								
					
								
								
													
					
						
								
								
						
								
								
							
								
								
							
							
								
									
										
										
											
												
												
													
													<tr>
													   
															
																<td class="crsheader">
																	
																			<span id="crsRestCd" title="Open to Freshmen Only">
																			FR</span><br>
																	
																			<span id="crsRestCd" title="Open to Juniors Only">
																			JR</span><br>
																	
																			<span id="crsRestCd" title="Open to Sophomores Only">
																			SO</span><br>
																		
																		</td>								
																<td class="crsheader">100</td>
															
															 
														
														<td  class="crsheader" colspan="5">
															
																
																
																
															
																
																	
																	
																	
																	
																	
																	
																	
																	
																	
																		
																	
																	
																
															
															
															
																
																	<a href="javascript:openNewWindow('http://www.ucsd.edu/catalog/courses/CSE.html#cse100')"><span class="boldtxt">Advanced Data Structures      </span> </a>
																
																
																
															
															( 4
															
															Units)
															<br>
															                              
															
															
														</td>
														<td  class="crsheader" colspan="6" align="right">
														<span class="boldtxt" onmouseover="" style="cursor: pointer;" onclick="JavaScript:openNewWindow('/scheduleOfClasses/scheduleOfClassesPreReq.htm?termCode=FA19&courseId=CSE100   ');"> Prerequisites  </span> &nbsp;|&nbsp;
														<span class="boldtxt" onmouseover="" style="cursor: pointer;" onclick="javascript:openNewWindow('http://courses.ucsd.edu/coursemain.asp?section=983805')">Resources</span>&nbsp;|&nbsp;
														<span class="boldtxt" onmouseover="" style="cursor: pointer;" onclick="javascript:openNewWindow('http://cape.ucsd.edu/responses/Results.aspx?courseNumber=CSE+100','CAPE')"><span title="CAPE - Course and Professor Evaluations">Evaluations</span></span></td>
													</tr>
												
											
										
									
							
								
								
								
								
								
								
								
								
								 
									
											
									
												
													
														<tr class="sectxt">
															<td class="brdr" border="0"></td>
															<td class="brdr">
																
															</td>					
															<td class="brdr">
																
															</td>
															<td class="brdr"><span id="insTyp" title="Lecture">LE</span></td>
															<td class="brdr">B00</td>
															
															
																
																
																	
																		
																		
																			<td class="brdr">MWF    </td>
																			<td class="brdr">9:00a-9:50a</td>
																			<td class="brdr">CENTR</td>
																			<td class="brdr">216  </td>
																		
																	
																	
																		
																			<td class="brdr">
																						
																						
																							
																								
																									<a href='mailto:yic242@ucsd.edu'>Cao, Yingjun                       </a>
																								
																								
																							
																							<br>
																						
																					
																					
																				
																			</td>
																			
																			    
																				 	<td  class="brdr"><span class="ertext">&nbsp;</span></td>
																					<td  class="brdr"><span class="ertext">&nbsp;</span></td>
																			    
																			    
																			     
																			    
																			
																			
																			    
																				 	<td  class="brdr"><span class="ertext">&nbsp;</span></td>
																			    
																			    
																			
																		
																		
																	
																
															
														</tr>	
														
													
													
												
											
									
												
													
														<tr class="sectxt">
															<td class="brdr" border="0"></td>
															<td class="brdr">
																
															</td>					
															<td class="brdr">
																
																	
																		
																		
																			983806
																		
																	 
																
															</td>
															<td class="brdr"><span id="insTyp" title="Discussion">DI</span></td>
															<td class="brdr">B01</td>
															
															
																
																
																	
																		
																		
																			<td class="brdr">Th      </td>
																			<td class="brdr">6:30p-7:20p</td>
																			<td class="brdr">MANDE</td>
																			<td class="brdr">B-210</td>
																		
																	
																	
																		
																			<td class="brdr">
																						
																						
																							
																								
																									<a href='mailto:yic242@ucsd.edu'>Cao, Yingjun                       </a>
																								
																								
																							
																							<br>
																						
																					
																					
																				
																			</td>
																			
																			    
																			    
																			     
																				 	<td  class="brdr"><span class="ertext">FULL<br>
																				 	Waitlist(0)
																				 	</span></td>
																					<td class="brdr">146</td>
																			    
																			    
																			
																			
																			    
																			    
																					<td class="brdr"><span onmouseover="" style="cursor: pointer;" onclick="JavaScript:openNewWindow('https://ucsdbkst.ucsd.edu/wrtx/TextSearch?section=983806&term=FA19&subject=CSE &course=100','bookstore');">
																						<img src="/scheduleOfClasses/images/book.gif" height="20" width="20"/>
																						</span>
																					</td>	
																				
																			
																		
																		
																	
																
															
														</tr>	
														
													
													
												
											
									
												
													
													
														<tr class="nonenrtxt">
														<td  class="brdr" colspan="2" border="0"></td>
																				
														<td class="brdr">
															
														</td>
														<td class="brdr"><span id="insTyp" title="Final">FI</span></td>
														<td class="brdr">12/11/2019</td>
														
														
															
															
																
																	
																	
																		<td class="brdr">W      </td>
																		<td class="brdr">8:00a-10:59a</td>
																		<td class="brdr">TBA</td>
																		<td class="brdr">TBA</td>
																	
																
																
																		<td class="brdr">
																				
																				
																					
																				
																			
																		</td>
																	
																		
																	
																		<td  class="brdr" colspan="3">&nbsp;</td>
																	
																
															
														
													</tr>	
													
													
												
											
										
									
								
							
						
							
							
								
					
								
								
													
					
						
								
								
						
								
								
							
								
								
							
							
								
									
										
										
											
												
												
													
													<tr>
													   
															
																<td class="crsheader">
																	
																			<span id="crsRestCd" title="Open to Freshmen Only">
																			FR</span><br>
																	
																			<span id="crsRestCd" title="Open to Juniors Only">
																			JR</span><br>
																	
																			<span id="crsRestCd" title="Open to Sophomores Only">
																			SO</span><br>
																		
																		</td>								
																<td class="crsheader">100</td>
															
															 
														
														<td  class="crsheader" colspan="5">
															
																
																
																
															
																
																	
																	
																	
																	
																	
																	
																	
																	
																	
																		
																	
																	
																
															
															
															
																
																	<a href="javascript:openNewWindow('http://www.ucsd.edu/catalog/courses/CSE.html#cse100')"><span class="boldtxt">Advanced Data Structures      </span> </a>
																
																
																
															
															( 4
															
															Units)
															<br>
															                              
															
															
														</td>
														<td  class="crsheader" colspan="6" align="right">
														<span class="boldtxt" onmouseover="" style="cursor: pointer;" onclick="JavaScript:openNewWindow('/scheduleOfClasses/scheduleOfClassesPreReq.htm?termCode=FA19&courseId=CSE100   ');"> Prerequisites  </span> &nbsp;|&nbsp;
														<span class="boldtxt" onmouseover="" style="cursor: pointer;" onclick="javascript:openNewWindow('http://courses.ucsd.edu/coursemain.asp?section=983807')">Resources</span>&nbsp;|&nbsp;
														<span class="boldtxt" onmouseover="" style="cursor: pointer;" onclick="javascript:openNewWindow('http://cape.ucsd.edu/responses/Results.aspx?courseNumber=CSE+100','CAPE')"><span title="CAPE - Course and Professor Evaluations">Evaluations</span></span></td>
													</tr>
												
											
										
									
							
								
								
								
								
								
								
								
								
								 
									
											
									
												
													
														<tr class="sectxt">
															<td class="brdr" border="0"></td>
															<td class="brdr">
																
															</td>					
															<td class="brdr">
																
															</td>
															<td class="brdr"><span id="insTyp" title="Lecture">LE</span></td>
															<td class="brdr">C00</td>
															
															
																
																
																	
																		
																		
																			<td class="brdr">MWF    </td>
																			<td class="brdr">11:00a-11:50a</td>
																			<td class="brdr">CENTR</td>
																			<td class="brdr">109  </td>
																		
																	
																	
																		
																			<td class="brdr">
																						
																						
																							
																								
																									<a href='mailto:yic242@ucsd.edu'>Cao, Yingjun                       </a>
																								
																								
																							
																							<br>
																						
																					
																					
																				
																			</td>
																			
																			    
																				 	<td  class="brdr"><span class="ertext">&nbsp;</span></td>
																					<td  class="brdr"><span class="ertext">&nbsp;</span></td>
																			    
																			    
																			     
																			    
																			
																			
																			    
																				 	<td  class="brdr"><span class="ertext">&nbsp;</span></td>
																			    
																			    
																			
																		
																		
																	
																
															
														</tr>	
														
													
													
												
											
									
												
													
														<tr class="sectxt">
															<td class="brdr" border="0"></td>
															<td class="brdr">
																
															</td>					
															<td class="brdr">
																
																	
																		
																		
																			983808
																		
																	 
																
															</td>
															<td class="brdr"><span id="insTyp" title="Discussion">DI</span></td>
															<td class="brdr">C01</td>
															
															
																
																
																	
																		
																		
																			<td class="brdr">Th      </td>
																			<td class="brdr">7:30p-8:20p</td>
																			<td class="brdr">MANDE</td>
																			<td class="brdr">B-210</td>
																		
																	
																	
																		
																			<td class="brdr">
																						
																						
																							
																								
																									<a href='mailto:yic242@ucsd.edu'>Cao, Yingjun                       </a>
																								
																								
																							
																							<br>
																						
																					
																					
																				
																			</td>
																			
																			    
																			    
																			     
																				 	<td  class="brdr"><span class="ertext">FULL<br>
																				 	Waitlist(13)
																				 	</span></td>
																					<td class="brdr">147</td>
																			    
																			    
																			
																			
																			    
																			    
																					<td class="brdr"><span onmouseover="" style="cursor: pointer;" onclick="JavaScript:openNewWindow('https://ucsdbkst.ucsd.edu/wrtx/TextSearch?section=983808&term=FA19&subject=CSE &course=100','bookstore');">
																						<img src="/scheduleOfClasses/images/book.gif" height="20" width="20"/>
																						</span>
																					</td>	
																				
																			
																		
																		
																	
																
															
														</tr>	
														
													
													
												
											
									
												
													
													
														<tr class="nonenrtxt">
														<td  class="brdr" colspan="2" border="0"></td>
																				
														<td class="brdr">
															
														</td>
														<td class="brdr"><span id="insTyp" title="Final">FI</span></td>
														<td class="brdr">12/10/2019</td>
														
														
															
															
																
																	
																	
																		<td class="brdr">Tu      </td>
																		<td class="brdr">11:30a-2:29p</td>
																		<td class="brdr">TBA</td>
																		<td class="brdr">TBA</td>
																	
																
																
																		<td class="brdr">
																				
																				
																					
																				
																			
																		</td>
																	
																		
																	
																		<td  class="brdr" colspan="3">&nbsp;</td>
																	
																
															
														
													</tr>	
													
													
												
											
										
									
								
							
						
					
				</table>
				<br>
				<div>
				 <table width="100%">
				 	<tbody>
					     <tr>
					     	<td align="left"><a href="/scheduleOfClasses/scheduleOfClassesStudent.htm">Start a new search</a></td>
					     	<td align="center"><a href="/scheduleOfClasses/scheduleOfClassesStudentResultPrint.htm">Printer Friendly</a></td>
					        <td align="right">
					        	Page  (1&nbsp;of&nbsp;1) &nbsp;
								
					
					            
					                
					                    
					                        1&nbsp;
					                    
					                    
					                
					            
							 
							    
						    </td>
					    </tr>
					 </tbody>
				 </table>
				    
				</div>
			
			
		
		
		
		<script >
			function openNewWindow (url, name) {
				if (navigator.appName == "Microsoft Internet Explorer") {
						window.open(url, name, "width=640,height=480,scrollbars=yes,resizable=yes,menubar=no,status=yes,location=no,toolbar=no");
				}
				else {
						win = window.open(url, name, "width=640,height=480,scrollbars=yes,resizable=yes,menubar=no,status=yes,location=no,toolbar=no");
						win.focus();
				}
			}
			(function($) {
				$(document).ready(function() {
				
				
				//data table
					$("#socDeptTab").dataTable({
						"bPaginate" : true,
						"bLengthChange": false,
						"bFilter": false,
						"bInfo": false,
						"bSort": false,
						"bJQueryUI": true,
						"sPaginationType": "full_numbers",
						"iDisplayLength": 2,
	
						"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
							 var color1 = 'white';
							 $(nRow).css('background-color', color1);
							 $("#socDeptTab thead").remove();
						}
					});
					
						//data table
					/*$(".datatable").dataTable({
						"bPaginate" : true,
						"bLengthChange": true,
						"bFilter": false,
						"bInfo": true,
						"sPaginationType": "full_numbers",
						"bJQueryUI": true,
						"iDisplayLength": 10,
					});*/
				});
			})(jQuery);
		</script>
		</form>
	</div>

	</div>
</div>
<!-- footer -->
<div id="tdr_footer">
    <div id="tdr_footer_content">
        <div>UC San Diego 9500 Gilman Dr. La Jolla, CA 92093 (858) 534-2230</div>
        <div>
            Copyright &copy;<span id="tdr_copyright_year">2015</span> Regents of the University of California. All rights reserved.
        </div>
        <ul id="tdr_footer_links">
            <li><a href="http://www.ucsd.edu/_about/legal/index.html">Terms &amp; Conditions</a></li>
            <li id="tdr_footer_feedback" class="last"><a href="//act.ucsd.edu/cwp/feedback/tool/apps"
                onclick="window.open('//act.ucsd.edu/cwp/feedback/help/tritonlink', 'DYGWYW', 'menubar=0,resizable=1,scrollbars=1,width=450,height=650');" target="DYGWYW">Feedback</a></li>
        </ul>
    </div>
</div>

<!-- shib timeout -->
<img src="https://a4.ucsd.edu/tritON/imagebug" alt=" " style="display: none;" />
<!-- google analytic -->

<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', "UA-24480055-22"]);
  _gaq.push(['_setDomainName', "ucsd.edu"]);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

</body>
</html>
`
}
