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
 
 ## To build the image
```
sudo docker build -t hobbs.evolvus.com:11083/e-authorization .
```

## To push the image to nextus
```
docker image push hobbs.evolvus.com:11083/e-authorization:latest
```

 
 ## To start the image
 ```
export TZ=Asia/Kolkata
export MONGO_DB_URL=mongodb://myUserAdmin:12356@192.168.1.152:27017/PlatformRelease_Test?poolSize=20&authSource=admin
export DEBUG=evolvus*
export CORPORATE_URL=http://192.168.1.151:8889/flux-services/corporate/status/


docker run --name e-authorization-service -e TZ -e MONGO_DB_URL -e DEBUG -e CORPORATE_URL -p 8098:8098 182.72.155.166:10515/e-authorization:latest
 ```
 

