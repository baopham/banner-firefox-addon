'use strict';

var notification, banner, domainsRegex;

banner = `
<div class="github-fork-ribbon-wrapper right fixed">
    <div class="github-fork-ribbon">
        <span id="ff-addon-banner-text">Bao's ENV</span>
    </div>
</div>
`;

notification = document.createElement('div');
document.body.appendChild(notification);

self.port.on("bannerPref", function(bannerText) {
  var element = document.getElementById('ff-addon-banner-text');
  element.textContent = bannerText;
});

self.port.on("domainsPref", function(domains) {
    domainsRegex = domains;
    if (document.URL.match(domainsRegex)) {
        notification.innerHTML = banner;
    }
    else if (notification) {
        notification.innerHTML = '';
    }
});
