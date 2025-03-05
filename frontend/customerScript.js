async function add(id,amt,api) {
    const username = document.getElementById(`${id}`).value;
    const amount = document.getElementById(`${amt}`).value;

    const res=await fetch(`http://localhost:5000/transactions/${api}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({user_id:username,amount}),
    });

    if (res.ok) {
        document.getElementById(`${id}`).value = '';
        document.getElementById(`${amt}`).value = '';
        alert('Transaction Initiated!');
        await getTransactions();
    } else {
        alert('Transaction Failed.');
    }

}

async function transfer() {
    const from_username = document.getElementById('from-transfer-user').value;
    const to_username = document.getElementById('to-transfer-user').value;
    const amount = document.getElementById('transfer-amount').value;

    const res=await fetch(`http://localhost:5000/transactions/transfer`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({from_user_id:from_username,to_user_id:to_username,amount}),
    });

    if (res.ok) {
        // document.getElementById('deposit').reset();
        document.getElementById(`from-transfer-user`).value = '';
        document.getElementById('to-transfer-user').value = '';
        document.getElementById(`transfer-amount`).value = '';
        alert('Transaction Initiated!');
        await getTransactions();
    } else {
        alert('Transaction Failed.');
    }

}

async function fetchUsers(id){
    //const user_id= localStorage.getItem('user_id');
    const res=await fetch(`http://localhost:5000/users`);
    const data=await res.json();

    const dropdown = document.getElementById(`${id}`);
    dropdown.innerHTML = '<option value="">Select a user</option>';

    data.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.text=user.name;
        dropdown.appendChild(option);
    })
}

async function fetchUsersById(id){
    const user_id= localStorage.getItem('user_id');
    const res=await fetch(`http://localhost:5000/users/${user_id}`);
    const data=await res.json();

    const dropdown = document.getElementById(`${id}`);
    dropdown.innerHTML = '<option value="">Select a user</option>';

    data.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.text=user.name;
        dropdown.appendChild(option);
        option.setAttribute('selected',true);
    })
}

async function getTransactions() {

    const user_id = localStorage.getItem('user_id');

    const res=await fetch(`http://localhost:5000/transactions/history/${user_id}`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });

    const data = await res.json();

    const tableBody = document.querySelector('#transactions-table tbody');
    tableBody.innerHTML = '';


    data.forEach(transaction => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${transaction.type}</td>
            <td>${transaction.user_id}</td>
            <td>${transaction.to_user_id}</td>
            <td>${transaction.amount}</td>
            <td>${transaction.status}</td>
        `;

        tableBody.appendChild(row);
    });
}

document.getElementById('sendEmailBtn').addEventListener('click', async () => {
    const recordCount = document.getElementById('recordCount').value;

    const subject = 'Your Transaction History';
    const text = `Here is your transaction history for the last ${recordCount} records.`;
    const user_id = localStorage.getItem('user_id');
    try {
        const response = await fetch('http://localhost:5000/transactions/send-transaction-history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recordCount, subject, text, user_id}),
        });

        if (response.ok) {
            alert('Transaction history email sent!');
        } else {
            alert('Failed to send email.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the email.');
    }
});

async function fetchUserBalance(id){
    const user_id= localStorage.getItem('user_id');
    const res=await fetch(`http://localhost:5000/users/${user_id}`);
    const data=await res.json();
    //console.log(data);
    data.forEach(user => {
        const label = document.getElementById(`${id}`);
        console.log(user.balance);
        label.innerHTML = `${user.balance}`;
    })
}

document.getElementById('logout').addEventListener('click', async () => {
    localStorage.removeItem('token');
    window.location.href = "./login/login.html";
});

window.onload = function() {
    fetchUsersById('to-user');
    fetchUsersById('from-user');
    fetchUsersById('from-transfer-user');
    fetchUsers('to-transfer-user');
    getTransactions();
    fetchUserBalance('balance');
};

setInterval(async () =>{
    getTransactions();
    fetchUserBalance('balance');
},6000);