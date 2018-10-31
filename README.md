# e-authorization

This service uses evolvus-user module to authorize userName. <br/>

## API
### Authorization API
------------------------
Method :'POST'<br/>
Request URL : 'http://localhost:8088/api/user/authorize'<br/>
Content-Type:'application/json'<br/>
Request Body:<br/>
<code>
{<br/>
	"userName":"name",<br/>
	"applicationCode":"code"<br/>
}<br/>
 </code>
 
 ### Token Update API
 ---------------------
Method :'POST'<br/>
Request URL : 'http://localhost:8088/api/user/updateToken'<br/>
Content-Type:'application/json'<br/>
Request Body:<br/>
<code>
{<br/>
	"id":"userid",<br/>
	"token":"<Your Token>"<br/>
}<br/>
 </code>

### Authorization API for IndusCollect
----------------------------------------
Method: 'POST'<br/>
Request URL: 'http://localhost:8088/api/user/authorize'<br/>
Content-Type:'application/json'<br/>
Request Body:<br/>
<code>
{<br/>
	"userId":"name",<br/>	 
}<br/>
 </code>

