
// var input=''
function getnum(num){
    // input+=num
    var inputElement=document.getElementById('input')
    inputElement.value+=num
}
function cls(){
    var  inputElement=document.getElementById('input')
    inputElement.value=' '
}
function calculate(){
    var inputElement=document.getElementById('input')
    var result=eval(inputElement.value)
    inputElement.value=result
}
function del(){
    var result=document.getElementById('input')
        result.value=result.value.slice(0,-1)
}