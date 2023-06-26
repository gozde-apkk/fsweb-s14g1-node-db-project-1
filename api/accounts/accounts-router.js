const router = require("express").Router();
const accountModel = require("./accounts-model");
const mw = require("./accounts-middleware");


router.get("/", async (req, res, next) => {
  try {
    res.json(
      await accountModel.getAll(
        req.query.limit,
        req.query.sortby,
        req.query.sortdir
      )
    );
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkAccountId, (req, res, next) => {
  try {
    res.json(req.existAccount);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const insertedAccountModel = {
        name: req.body.name,
        budget: req.body.budget,
      };
      const instertedAccount = await accountModel.create(insertedAccountModel);
      res.status(201).json(instertedAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountId,
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const updatedAccountModel = {
        name: req.body.name,
        budget: req.body.budget,
      };
      const updatedAccount = await accountModel.updateById(
        req.params.id,
        updatedAccountModel
      );
      res.status(200).json(updatedAccount);
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    await accountModel.deleteById(req.params.id);
    res.json({ message: `${req.params.id}'idli kayıt silindi` });
  } catch (error) {
    next(error);
  }
});


router.use((err, req, res, next) => { // eslint-disable-line
  // KODLAR BURAYA
})

module.exports = router;
