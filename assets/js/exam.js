const checkIfCheckboxChecked = () => {
    let prevChecked = JSON.parse(localStorage.getItem("selectedAnswers") || "[]");
    prevChecked.forEach(function (checkbox) {
        if (checkbox.id === localStorage.getItem('currentQuesId')) {
            $("input[value='" + checkbox.choice + "']").prop('checked', true);
            if (checkbox.review === 1) {
                $('#reviewBtn').prop('disabled', true);
                document.querySelector(`button[value="${checkbox.id}"]`).style.backgroundColor = '#B9B5F6';
            } else {
                $('#reviewBtn').prop('disabled', false);
                document.querySelector(`button[value="${checkbox.id}"]`).style.backgroundColor = '#A0E6B7';
            }
        } else {
            $('#reviewBtn').prop('disabled', false);
        }
    });
}
//button
function buttonclick(e) {
    // console.log(e.value);
    $("button").removeClass("activeques")
    $(e).addClass("activeques");
    fetch(`/question?s=${e.value}`, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((data) => {
            //
            var clist = document.getElementsByTagName("input");
            for (var i = 0; i < clist.length; ++i) { clist[i].checked = false; }

            // console.log(data) 
            localStorage.setItem('currentQuesId', data.questions.questionId)
            document.getElementById('option1').value = data.questions.options[0]
            document.getElementById('option2').value = data.questions.options[1]
            document.getElementById('option3').value = data.questions.options[2]
            document.getElementById('option4').value = data.questions.options[3]
            quillOption1.root.innerHTML = data.questions.options[0]
            quillOption2.root.innerHTML = data.questions.options[1]
            quillOption3.root.innerHTML = data.questions.options[2]
            quillOption4.root.innerHTML = data.questions.options[3]
            quillDisplay.root.innerHTML = data.questions.question
            // 
            checkIfCheckboxChecked();

        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

//
function onlyOne(e) {
    $('input[type="checkbox"]').not(e).prop('checked', false);
    $('#reviewBtn').prop('disabled', false);
    let selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers") || "[]");
    const currentQuesId = localStorage.getItem('currentQuesId')

    const removeObj = () => {
        const findIndex = selectedAnswers.findIndex(a => a.id === currentQuesId)
        findIndex !== -1 && selectedAnswers.splice(findIndex, 1)
    }
    if (e.checked) {
        var answer = {
            id: localStorage.getItem('currentQuesId'),
            choice: e.value || "",
            review: 0,
        };
        document.querySelector(`button[value="${answer.id}"]`).style.backgroundColor = '#A0E6B7';
        removeObj();
        selectedAnswers.push(answer);
    } else {
        $('#reviewBtn').prop('disabled', true);
        removeObj();
        document.querySelector(`button[value="${localStorage.getItem('currentQuesId')}"]`).style.backgroundColor = '#F7B2B2';
    }
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
}

// TODO:
// push and fetch from db (initial data)