function testCode(Code){
    return /^20IT/.test(Code)
}

function save(){
    let fullName = document.getElementById('fullName').value
    let Code = document.getElementById('Code').value
    let Address = document.getElementById('Address').value
    let phone = document.getElementById('phone').value

    //Ho va ten
    if(_.isEmpty(fullName)){
        fullName = ''
        document.getElementById('fullNameError').innerText = '*Nhập họ tên dùm cái'
    }else if(fullName.length < 8){
        fullName = ''
        document.getElementById('fullNameError').innerText = '*Ngắn vậy ??'
    }
    else{
        document.getElementById('fullNameError').innerText = ''
    }

    //maSV
    if(_.isEmpty(Code)){
        Code = ''
        document.getElementById('codeError').innerText = '*Nhập dùm mã sv cái'
    }else if(!testCode(Code)){
        Code = ''
        document.getElementById('codeError').innerText = "*sai định dạng rồi kìa"
    }else{
        document.getElementById('codeError').innerText = ''
    }

    //Dia chi
    if(_.isEmpty(Address)){
        Address = ''
        document.getElementById('addressError').innerText = '*Địa chỉ đâu ??'
    }else{
        document.getElementById('addressError').innerText = ''
    }

    //SDT
    if(_.isEmpty(phone)){
        phone = ''
        document.getElementById('phoneError').innerText = '*SĐT ??'
    }else if(phone.length < 6){
        phone = ''
        document.getElementById('phoneError').innerText = '*Nhập lại đúng cái SĐT cái'
    }else if(phone.length > 10){
        phone = ''
        document.getElementById('phoneError').innerText = '*SĐT gì dài vậy ??'
    }else{
        document.getElementById('phoneError').innerText = ''
    }

    if(fullName && Code && Address && phone){
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

        students.push({
            fullName: fullName,
            code: Code,
            address: Address,
            phone: phone
        })

        localStorage.setItem('students', JSON.stringify(students))

        this.renderListStudent()
    }
}

function renderListStudent(){
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

    if(students.length === 0){
        document.getElementById('right').style.display = 'none'
        return false
    }
    
    document.getElementById('right').style.display = 'block'
    
    let tableContent = `
            <tr>
                <td>#</td>
                <td>Mã SV</td>
                <td>Họ tên</td>
                <td>Địa chỉ</td>
                <td>SĐT</td>
            </tr>
        `

    students.forEach((student, index) => {
        index++
        tableContent += `
             <tr>
                <td>${index}</td>
                <td>${student.code}</td>
                <td>${student.fullName}</td>
                <td>${student.address}</td>
                <td>${student.phone}</td>
            </tr>
        `
    })
    document.getElementById('list-student').innerHTML = tableContent
}