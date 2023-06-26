exports.checkAccountPayload = (req, res, next) => {
  try {
    let { name, budget } = req.body;
    if (name === undefined || budget === undefined) {
      res.status(400).json({ message: "name and budget are required" });
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      res
        .status(400)
        .json({ message: "name of account must be between 3 and 100" });
    } else if (typeof budget !== "number" || isNaN(budget)) {
      //unit testlerden geçebilmek için NaN olayına girdik
      res.status(400).json({ message: "budget of account must be a number" });
    } else if (budget < 0 || budget > 1000000) {
      res
        .status(400)
        .json({ message: "budget of account is too large or too small" });
    } else {
      req.body.name = req.body.name.trim();
      //insert ettiğimizi de trimli halde istiyor
      //trim girilen isimin sağındaki solundaki boşlukları yokediyor.  name require şartlarınısağlamak için(min 3) boşluk koymamızı engeller, böylece harf yazmak zorundayız
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    // const allAccounts = await accountModel.getAll();
    // const isExist = allAccounts.filter((e) => e.name == req.body.name);
    //tüm datayı indirmek performansı düşürür, o yüzden yukardaki kötü çözüm
    const isExist = await accountModel.getByName(req.body.name);
    if (isExist) {
      res.status(400).json({ message: "that name is taken" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const isExistAccount = await accountModel.getById(req.params.id);
    if (!isExistAccount) {
      res.status(404).json({ message: "account not found" });
    } else {
      req.existAccount = isExistAccount;
      //tekrar roota dönmesin diye değişkene atadık,
      next();
    }
  } catch (error) {
    next(error);
  }
};