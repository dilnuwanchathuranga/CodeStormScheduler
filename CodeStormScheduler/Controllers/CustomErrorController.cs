﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CodeStormScheduler.Controllers
{
    public class CustomErrorController : Controller
    {
        // GET: CustomError
        public ActionResult NotFound()
        {
            Response.StatusCode = 404;
            return View();
        }

        public ActionResult Error()
        {
            Response.StatusCode = 500;
            return View();
        }
    }
}