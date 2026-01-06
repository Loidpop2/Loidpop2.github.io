// fancy ui

function hotbar_backgroundSelector() {
    var chosen = false;
    for (var i = 0; i < document.getElementById("hotbar").childElementCount; i++) {
        e = document.getElementsByClassName("hotbar-button")[i];
        if (document.URL.includes(e.getAttribute("href")))
        {
            e.className = "hotbar-button-this";
            chosen = true;
        }
        console.log(i);
        console.log(e.getAttribute("href"));
        console.log(e);
    }
    if (chosen == false) { document.getElementsByClassName("hotbar-button")[0].className = "hotbar-button-this"; }
}

function searchbar_blogs() {
    var articles = ["About_me", "Test_Poll", "Feedback", "Unity__Murder_Spree","Workspace__Whiteboard"];
    myInput = document.getElementById("search-products")    
    if (!myInput) {
        return; // not on the blogs page
    }
    myInput.addEventListener('input', function(event) {
        const currentValue = event.target.value;
        document.getElementById("blog").innerHTML = "";
        for (var i = 0; i < articles.length; i++ ) {
            if (articles[i].toLowerCase().replaceAll("__"," - ").replaceAll("_", " ").includes(currentValue.toLowerCase()) || currentValue == "")
            {
                // Render blog
                document.getElementById("blog").innerHTML = document.getElementById("blog").innerHTML + "<a href=\"/blogs/" + articles[i] + "\"><div class=\"blog\" id=\"blog-" + i + "\"><center><p class=\"blog\">" + articles[i].replaceAll("__"," - ").replaceAll("_", " ") + "</p></center>\n<img src=\"/blogs/" + articles[i] + "/logo.png\" class=\"blog-cover\"></div></a>";
            }
        } 
    });
    document.getElementById("blog").innerHTML = "";
    for (var i = 0; i < articles.length; i++ ) {

        // Render blog
        document.getElementById("blog").innerHTML = document.getElementById("blog").innerHTML + "<a href=\"/blogs/" + articles[i] + "\"><div class=\"blog\" id=\"blog-" + i + "\"><center><p class=\"blog\">" + articles[i].replaceAll("__"," - ").replaceAll("_", " ") + "</p></center>\n<img src=\"/blogs/" + articles[i] + "/logo.png\" class=\"blog-cover\"></div></a>";
    } 
}

// startup calls

function page() {
    hotbar_backgroundSelector();
    searchbar_blogs();
    (async () => {
        const polls = [["Test_Poll",["poll_favColor","poll_favColor_like"]],["Feedback",["feedback"]],["Unity__Murder_Spree",["feedback__unity__murder_spree"]]];

        for (var i = 0; i < polls.length; i++) {
          if (document.URL.includes(polls[i][0]))
          {
              var pollId = polls[i][1];
          }
        }
        document
          .querySelectorAll(".poll-option")
          .forEach(btn => {
            btn.classList.toggle(
              "selected",
              false
            )});
        for (i in pollId)
        {

          var existingVote = [];
          existingVote[i] = await getMyVote(pollId[i]);


          if (existingVote) {
              selectOption(existingVote[i]);
          }


          await loadResults(pollId);
        }
    })();
}

// polls

const SUPABASE_URL = "https://ibgyijifkczqokzjsmrc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZ3lpamlma2N6cW9rempzbXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3Mjg3ODksImV4cCI6MjA4MTMwNDc4OX0.Y6c5sRVn8e3WAOA9xNcM0jwwTwB5IwrNtZLhC3rJbAo";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

function getSessionId() {
  let id = localStorage.getItem("poll_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("poll_session", id);
  }
  return id;
}

const sessionId = getSessionId();



function selectOption(optionId) {
  document
    .querySelectorAll(".poll-option")
    .forEach(btn => {
      btn.classList.toggle(
        "selected",
        (btn.dataset.option === optionId || btn.classList.contains("selected"))
      );
    });
}

async function submitVote(pollId, optionId) {
  const { error } = await supabaseClient
    .from("votes")
    .upsert({
      poll_id: pollId[0],
      option_id: optionId,
      session: sessionId,
    }, {
      onConflict: "poll_id,session"
    });

  if (error) {
    console.error(error);
    return;
  }
  document
    .querySelectorAll(".poll-option")
    .forEach(btn => {
      btn.classList.toggle(
        "selected",
        false
      )});
  for (i in pollId) {
    selectOption(await getMyVote(pollId[i]));
  }

  loadResults(pollId);
}

async function loadResults(pollId) {
  var supabaseStuff = [];
  for (i in pollId) {
    const { data, error } = await supabaseClient
      .from("votes")
      .select("option_id")
      .order("created_at")
      .eq("poll_id", pollId[i]);
    supabaseStuff[i] = { data, error }; 

    if (error) {
      console.error(error);
      return;
    }
  }

  const counts = {};

  for (i in supabaseStuff)
  {
    supabaseStuff[i].data.forEach(v => {
      counts[v.option_id] = (counts[v.option_id] || 0) + 1;
    });

    document.querySelectorAll(".poll-option").forEach(btn => {
      const option = btn.dataset.option;
      const count = counts[option] || 0;
      const label = document.getElementById(`count-${option}`);
      if (label) {
        label.textContent = `${count} vote${count === 1 ? "" : "s"}`;
      }
    });
  }
  const responseList = document.getElementById("responses");
  var responses = "";
  supabaseStuff[i].data.forEach(v => {
  responses = `<div class="feedback">${v.option_id}</div>` + responses;
  });
  if (responseList) {
    responseList.innerHTML = responses;
  }
}


async function submitTextVote(pollId, text) {
  const { error } = await supabaseClient
    .from("votes")
    .insert({
      poll_id: pollId[0],
      option_id: text
    }, {
      onConflict: "poll_id,session"
    });

  if (error) {
    console.error(error);
    return;
  }

  const polls = [["Test_Poll",["poll_favColor","poll_favColor_like"]],["Feedback",["feedback"]],["Unity__Murder_Spree",["feedback__unity__murder_spree"]]];

  for (var i = 0; i < polls.length; i++) {
    if (document.URL.includes(polls[i][0]))
    {
        var thing = polls[i][1];
    }
  }
  loadResults(thing);
}

async function getMyVote(pollId) {
  const { data } = await supabaseClient
    .from("votes")
    .select("option_id")
    .eq("poll_id", pollId)
    .eq("session", sessionId)
      .maybeSingle();
  return data?.option_id ?? null;
}

// exporting files

function saveTXT(valueinput, filename) {
    let blobdtMIME =
        new Blob([valueinput], { type: "text/plain" })
    let url = URL.createObjectURL(blobdtMIME)
    let anele = document.createElement("a")
    anele.setAttribute("download", filename);
    anele.href = url;
    anele.click();
}

async function importData(idOfOutput, whatFunction) {
  let input = document.createElement('input');
  input.type = 'file';
  input.onchange = _ => {
            let files =   Array.from(input.files);
            files[0].text().then((text) => {
              const importedText = text;
              document.getElementById(idOfOutput).value = importedText;

              if (whatFunction) {
                whatFunction(importedText);
              }
            }).catch((error) => {
              console.error("Error reading file:", error);
            });
        };
  input.click();
}