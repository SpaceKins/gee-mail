var lastNodeChanged;
var lastNodeClassName;

function createRow(thisElement, email,isEven)
{
	var node=document.createElement("tr");

	node.onclick = function(){alert(email.body);}; 
	node.onmouseover= function(){
		setMessagePreview(email.body);
  if(lastNodeChanged !== undefined)
  {
  	lastNodeChanged.className=lastNodeClassName;
  	
  }

lastNodeChanged=node;
lastNodeClassName=node.className;
		node.className += " thisMessage";
		}; 

	//element.addEventListener('click',function(){});

	node.setAttribute("class",(isEven?"even":"odd"));

	thisElement.appendChild(node);
	node.appendChild(createTableCell("",false,email.body));
	node.appendChild(createTableCell(email.date.toDateString()));
	node.appendChild(createTableCell(email.sender));
	node.appendChild(createTableCell(email.subject));
}

function setMessagePreview(message)
{
	var messagePreviewIdNode=document.getElementById("messagePreview");
	var messageTextNode=messagePreviewIdNode.childNodes[0];

	messageTextNode.nodeValue=message;
}

function createTableCell(useText, isClickable,clickMessage){{
	var node=document.createElement("td");
	var nodeText=document.createTextNode(useText);


	if(isClickable)
	{
		var hrefNode=document.createElement("a");
		hrefNode.setAttribute("href","#");   
	}
	else
	{
		node.appendChild(nodeText);
	}
	return node;
}}

function setEmailCount()
{
	var tbodyMessages=document.getElementById("mailTable").getElementsByTagName("tr").length;
	var CountNodeID=document.getElementById("messageCount");

	CountNodeID.textContent=tbodyMessages;

if(tbodyMessages>10)
	{
		CountNodeID.setAttribute("class","mailGreaterThan10");
	} else
	if(tbodyMessages>5)
	{
		CountNodeID.setAttribute("class","mail10");
	}
	else
	{
		CountNodeID.setAttribute("class","mail5");
	}

}

function displayMessages(messages)
{
	var useMessages=messages; 

	var tbodyElement=document.getElementById("mailTable").getElementsByTagName("tbody");
	var tbodyRows=document.getElementById("mailTable").getElementsByTagName("tr").length;

	var isEven=(tbodyRows%2)?true:false;
	var thisMessage;

	for(var i=0;i<useMessages.length;i++)
	{
		thisMessage=useMessages[i];
		createRow(tbodyElement[0],useMessages[i],isEven);
		console.log(useMessages[i].subject);
		isEven=!isEven;
	}	

	setEmailCount();
}


function addNewMessage(){
	var newMessageArray=[];
    newMessageArray.push(getNewMessage());	

	displayMessages(newMessageArray);
}