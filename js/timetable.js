function construstTimeTable(timeTable, talksData) {
    return Object.keys(timeTable)
        .filter(function (k) { return timeTable[k]; })
        .sort()
        .map(function (time) {
            console.log(time);
            var name = timeTable[time];
            console.log(name);

            var index = 0;
            var talk = talksData.filter(function (t) { return t.name.indexOf(name) == 0; })[index];
            console.log(talk)
            // 何部目か判定
            if (
                (name == "第1部") ||
                (name == "第2部") ||
                (name == "第3部") ||
                (name == "第4部")
            ) {
                return { time: name, name: "", title: "", major: "" };
            }

            // 改行
            else if (name == "改行") {
                return { time: "\xa0", name: "\xa0", title: "", major: "" };
            }

            // ---- 座談会（今年は「座談会」表記。念のため旧表記も許容）----
            if (name.indexOf("座談会") === 0 || name.indexOf("休憩・座談会") === 0) {
                return { time: time, name: "", title: "座談会", major: "" };
            }

            // 平野さんWS
            else if (name == "十河WS") {
                return {
                    time: time,
                    name: "ワークショップ：十河翔",
                    title: "自分の「推し（好きなもの）」を言語化するとともに、他者の「推し」やその理由を知ることを通して、「推し」が社会や生活と、どのように紐づいているかを考える、その最初のキッカケを得ることとします。",
                    major: "学際情報学府"
                };
            }
            
            else {
                // 通常講演者
                return {
                  time: time,
                  name: talk.name,
                  title: talk.title,
                  major: talk.affiliation
                };
              }

        });

}


// ▼ 3日分に拡張（ヘッダは 22/23/24 日）
$(function () {
  var DayTable1 = construstTimeTable(day1, data);
  var DayTable2 = construstTimeTable(day2, data);
  var DayTable3 = construstTimeTable(day3, data);

  var template = $('#template').html();
  Mustache.parse(template);

  var rendered1 = Mustache.render(template, { table: DayTable1, header: "11/22（土）" });
  var rendered2 = Mustache.render(template, { table: DayTable2, header: "11/23（日）" });
  var rendered3 = Mustache.render(template, { table: DayTable3, header: "11/24（月）" });

  $('.article-headline').html([rendered1, "<br />", rendered2, "<br />", rendered3].join(""));
});