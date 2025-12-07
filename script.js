window.onload = function(){
   let box = document.getElementById("content-box");
   // Home Button Functionality
   document.getElementById("homeBtn").onclick = function(){
        box.innerHTML = `
        <h2>Women Security Information</h2>
        <p>This platform helps ensure safety, track health cycles, communicate instantly and share location if needed.</p>
        <ul>
        <li>Emergency contacts</li>
        <li>Safe location share</li>
        <li>Health reminders</li>
        <li>Chat assistance</li>
        </ul>
        `;
   }
   // Camera Button Functionality
  document.getElementById("camBtn").onclick = function(){
        box.innerHTML = `
        <h2>Camera On</h2>
        <video id="camVideo" width="100%" height="280" autoplay></video>
        `;
         // Camera Access Script
        let video = document.getElementById("camVideo");
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            box.innerHTML = `<p style="color:red;">Camera permission denied or not available.</p>`;
        });
    }
    // Location Button Functionality
  document.getElementById("locBtn").onclick = function(){
        box.innerHTML = `
        <h2>Share Location via SMS</h2>
        <p>Fetching your current location...</p>
        <p id="locOutput"></p>
        `;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    let lat = pos.coords.latitude.toFixed(6);
                    let lon = pos.coords.longitude.toFixed(6);
                    document.getElementById("locOutput").innerHTML = `
                    <b>Latitude:</b> ${lat} <br>
                    <b>Longitude:</b> ${lon} <br><br>
                    <input type="tel" id="smsNumber" placeholder="Enter phone number" style="width:80%;padding:6px;" /><br><br>
                    <button id="shareBtn">Send SMS</button>
                            `;
                    document.getElementById("shareBtn").onclick = function(){
                        let number = document.getElementById("smsNumber").value.trim();
                        if(!number) return alert("Please enter a phone number");
                        let message = `Hi, I am sharing my current location: https://www.google.com/maps?q=${lat},${lon}`;
                        let smsLink = `sms:${number}?body=${encodeURIComponent(message)}`;
                        window.open(smsLink, "_blank");
                    }
                },
                (err) => {
                    document.getElementById("locOutput").innerHTML =
                    `<p style="color:red;">Permission denied or location unavailable.</p>`;
                }
            );
        } else {
       document.getElementById("locOutput").innerHTML =
       `<p style="color:red;">Geolocation not supported by your browser.</p>`;
        }
    }
    // Chat Button Functionality
  document.getElementById("chatBtn").onclick = function(){
        box.innerHTML = `
        <h2>Local Chat</h2>
        <div id="chatBox" style="border:1px solid #ccc; padding:10px; height:150px; overflow-y:auto; background:#f9f9f9;"></div>
        <textarea id="chatMessage" rows="3" placeholder="Type your message..." style="width:100%; margin-top:5px;"></textarea>
        <br>
        <button id="sendChatBtn" style="margin-top:5px;">Send</button>
        `;
        const chatBox = document.getElementById("chatBox");
        const chatInput = document.getElementById("chatMessage");
        // send button
        document.getElementById("sendChatBtn").onclick = function(){
            let message = chatInput.value.trim();
            if(!message) return; // Do nothing if empty
            // Add message to chat box
            let msgDiv = document.createElement("div");
            msgDiv.style.margin = "5px 0";
            msgDiv.style.padding = "5px";
            msgDiv.style.background = "#d11a5f";
            msgDiv.style.color = "white";
            msgDiv.style.borderRadius = "5px";
            msgDiv.textContent = message;
            chatBox.appendChild(msgDiv);
            // Scroll to bottom
            chatBox.scrollTop = chatBox.scrollHeight;
            // Clear input
            chatInput.value = "";
        }
  }
    // Notes Button Functionality
  document.getElementById("notesBtn").onclick = function(){
        box.innerHTML = `
        <h2>Notes</h2>
        <textarea id="noteInput" rows="5" placeholder="Write notes..." style="width:100%;"></textarea>
        <br><br>
        <button id="saveNoteBtn">Save Note</button>
        <h3>Saved Notes:</h3>
        <div id="notesList" style="border:1px solid #ccc; padding:10px; min-height:100px; background:#f9f9f9; overflow-y:auto;"></div>
        `;
        const notesList = document.getElementById("notesList");
        const noteInput = document.getElementById("noteInput");
        //save note button
        document.getElementById("saveNoteBtn").onclick = function(){
            let note = noteInput.value.trim();
            if(!note) return;
            // Add to list (in memory only)
            let noteDiv = document.createElement("div");
            noteDiv.textContent = note;
            noteDiv.style.margin = "5px 0";
            noteDiv.style.padding = "5px";
            noteDiv.style.background = "#d11a5f";
            noteDiv.style.color = "white";
            noteDiv.style.borderRadius = "5px";
            notesList.appendChild(noteDiv);
            noteInput.value = "";
        }
  }
  // Reminder Button Functionality
  document.getElementById("remBtn").onclick = function(){
        box.innerHTML = `
        <h2>Set Reminder</h2>
        <label>Select Date & Time:</label><br>
        <input type="datetime-local" id="reminderTime" style="margin-top:5px; padding:5px;"/><br><br>
        <button id="setRemBtn">Set Reminder</button>
        <h3>Upcoming Reminders:</h3>
        <ul id="remList" style="background:#f9f9f9; border:1px solid #ccc; padding:10px; min-height:50px;"></ul>
        `;
        const remList = document.getElementById("remList");
        document.getElementById("setRemBtn").onclick = function(){
            const remInput = document.getElementById("reminderTime").value;
            if(!remInput){
                alert("Please select date & time");
                return;
            }
            const remDate = new Date(remInput);
            const now = new Date();
            if(remDate <= now){
                alert("Please select a future date & time");
                return;
            }
            // Show in list
            const li = document.createElement("li");
            li.textContent = `Reminder set for: ${remDate.toLocaleString()}`;
            remList.appendChild(li);
            // Calculate time until reminder
            const delay = remDate.getTime() - now.getTime();
            // Trigger alert at reminder time
            setTimeout(() => {
                alert(`⏰ Reminder! It's now ${remDate.toLocaleString()}`);
            }, delay);
         }
    }
    //Period Tracker Button Functionality
  document.getElementById("periodBtn").onclick = function(){
        box.innerHTML = `
        <h2>Period Tracker</h2>
        <label>Select Last Period Date:</label><br>
        <input type="date" id="lastPeriodDate" style="margin-top:5px; padding:5px;"/><br><br>
        <label>Average Cycle Length (days):</label><br>
        <input type="number" id="cycleLength" placeholder="28" style="margin-top:5px; padding:5px; width:60px;"/><br><br>
        <button id="predictBtn">Predict Next Period</button>
        <p id="predictionResult" style="margin-top:10px; font-weight:bold;"></p>
        `;
        document.getElementById("predictBtn").onclick = function(){
            const lastDateStr = document.getElementById("lastPeriodDate").value;
            let cycleLength = parseInt(document.getElementById("cycleLength").value);
            if(!cycleLength) cycleLength = 28; // default 28 days
            if(!lastDateStr){
                alert("Please select last period date");
                return;
            }
            const lastDate = new Date(lastDateStr);
            const nextDate = new Date(lastDate.getTime() + cycleLength*24*60*60*1000);
            document.getElementById("predictionResult").innerText =
                `Predicted Next Period: ${nextDate.toDateString()}`;
        }
  }
   // load default screen
   document.getElementById("homeBtn").click();
}