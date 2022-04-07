const topics = document.querySelector("#view-topic-1");

function showHideColour(id)
{
    console.log(id);
    let element = document.getElementById(id);
    element.classList.toggle("round-corner");
}
function showHideSubTopics()
{
    
    topics.classList.toggle('show');
}
