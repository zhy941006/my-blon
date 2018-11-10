const express=require("express")
const router=express.Router()

const ctrl=require("../controller/article")

router.get("/article/add",ctrl.ShowContenWall)

router.post("/article/add",ctrl.addArticle)

router.get("/article/info/:id",ctrl.ShowCentenHelf)

router.get("/article/edit/:id",ctrl.ShowCentenPass)

router.post("/article/edit/",ctrl.EditAticle)

module.exports=router