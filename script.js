const input = document.querySelector("input");
const button = document.querySelector("button");
const textarea = document.querySelector("textarea");


var communicator = '';
button.onclick = () => {
    var prompt = input.value;
    if(prompt != ''){
        buttonScroll();
        (textarea.innerHTML == '') ? communicator = 'You: ':communicator = '\n\nYou: ';
        textarea.innerHTML += communicator + prompt;

        // use SSE to get server Events 用SSE取得server事件 
        var source = new SSE("request.php?prompt=" + prompt);
        input.value = '';
        input.focus();
        source.addEventListener('message', function(e){
            if(e.data){
                if(e.data != '[DONE]'){
                    var tokens = JSON.parse(e.data).choices[0].text;
                    textarea.innerHTML += tokens;
                    buttonScroll();
                }else{
                    console.log("completed");
                }
            };
        })
        source.stream();
    }
}
function buttonScroll(){
    textarea.scrollIntoView(false);
    textarea.scroll(0, textarea.scrollHeight);

}