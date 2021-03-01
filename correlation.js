var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

getJSON('https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } 
  else 
  {
     var array = data;
     var parent = document.getElementById("events");
     var dict = {};
     var squ = 0;
     for(let i = 0; i < array.length; i++)
     {
        var par = document.createElement("tr");
        var e1 = document.createElement("th");
        var te1 = document.createTextNode(i+1);
        e1.append(te1);
        par.append(e1);
        var e2 = document.createElement("td");
        var te2 = document.createTextNode(array[i].events);
        e2.append(te2);
        par.append(e2);
        var e3 = document.createElement("td");
        var te3 = document.createTextNode(array[i].squirrel);
        e3.append(te3);
        par.append(e3);
        if(array[i].squirrel == true)
        {
            par.style.backgroundColor = "red";
            squ++;
        }
        parent.append(par);

        for(let j = 0; j < array[i].events.length; j++)
        {
            var key= array[i].events[j];
            if(!(key in dict))
            {
                dict[key] = Array(2).fill(0).map(()=>Array(2).fill(0))
            }
            var mat = dict[key];
            if(array[i].squirrel == true)
            {
                mat[0][0]++;
            }
            else
            {
                mat[1][0]++;
            }
        }
     }

     var parent1 = document.getElementById("correlation");
     let z = 1;
     var dic2 = {};
     var dif = 0.0000000001;
     for(var ke in dict)
     {     
        var max = dict[ke];
        max[0][1] = squ - max[0][0];
        max[1][1] = array.length - (max[0][0] + max[0][1] + max[1][0]);
        var tp = max[0][0];
        var tn = max[1][1];
        var fp = max[0][1];
        var fn = max[1][0];
        var mcc = (((tp * tn) - (fp * fn))/Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn)));
        if(!(mcc in dic2))
        {
            dic2[mcc] = ke;
        }
        else
        {
            while(mcc in dic2)
            {
                mcc = mcc + dif;               
            }
            dic2[mcc] = ke;
        }
     }

     var keys = Object.keys(dic2);

    //Get the number of keys - easy using the array 'length' property
    var i, len = keys.length; 

    //Sort the keys. We can use the sort() method because 'keys' is an array
    keys.sort(function(a, b){return b-a});

    for (i = 0; i < len; i++)
     {
        var corr = keys[i];
        var par1 = document.createElement("tr");
        var e15 = document.createElement("th");
        var te15 = document.createTextNode(z);
        e15.append(te15);
        par1.append(e15);
        var e25 = document.createElement("td");
        var te25 = document.createTextNode(dic2[corr]);
        e25.append(te25);
        par1.append(e25);
        var e35 = document.createElement("td");
        var te35 = document.createTextNode(corr);
        e35.append(te35);
        par1.append(e35);
        parent1.append(par1);
        z = z+1;
     }
  }
});

