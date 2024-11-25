const brandService = require('./brandService');

exports.createBrand = async (req, res) => {
  try {
    const { vehicles_type_id, icon, name } = req.body;

    const newBrand = await brandService.createBrand({ vehicles_type_id, icon, name });

    res.status(201).json(newBrand);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar marca: ' + error.message });
  }
};

exports.getAllBrands = async (_req, res) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar marcas: ' + error.message });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const brand = await brandService.getBrandById(req.params.id);
    if (!brand) {
      res.status(404).json({ error: 'Marca não encontrada' });
    } else {
      res.status(200).json(brand);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar marca: ' + error.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const brand = await brandService.updateBrand(req.params.id, req.body);
    res.status(200).json(brand);
  } catch (error) {
    if (error.message === 'Marca não encontrada') {
      res.status(404).json({ error: 'Marca não encontrada' });
    } else {
      res.status(500).json({ error: 'Erro ao atualizar marca: ' + error.message });
    }
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const result = await brandService.deleteBrand(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'Marca não encontrada') {
      res.status(404).json({ error: 'Marca não encontrada' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar marca: ' + error.message });
    }
  }
};
