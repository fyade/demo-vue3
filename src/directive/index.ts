import noMoreClick from "@/directive/modules/noMoreClick.ts";

const directivesList = {
  noMoreClick
}

const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
