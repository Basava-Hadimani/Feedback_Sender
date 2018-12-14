const keys = require('../config/keys');

module.exports = (survey) => {
  return `
      <html>
        <body>
        <div style="text-align : center">
          <h3> I'd like your input</h3>
          <p>Please answer the following questions</p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.feedbackLink}/api/${survey.id}/feedback/yes">Yes</a>
          </div>
          <div>
            <a href="${keys.feedbackLink}/api/${survey.id}/feedback/no">No</a>
          </div>
        </div>
        </body>
      </html>
  `;
}
