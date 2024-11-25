const Brand = require('./brandModel');

const createBrand = async (brandData) => {
  try {
    return await Brand.create(brandData);
  } catch (error) {
    throw new Error('Erro ao criar marca: ' + error.message);
  }
};

const getAllBrands = async () => {
  try {
    return await Brand.findAll();
  } catch (error) {
    throw new Error('Erro ao buscar todas as marcas: ' + error.message);
  }
};

const getBrandById = async (brandId) => {
  try {
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      throw new Error('Marca não encontrada');
    }
    return brand;
  } catch (error) {
    throw new Error('Erro ao buscar marca por ID: ' + error.message);
  }
};

const updateBrand = async (brandId, brandData) => {
  try {
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      throw new Error('Marca não encontrada');
    }
    return await brand.update(brandData);
  } catch (error) {
    throw new Error('Erro ao atualizar marca: ' + error.message);
  }
};

const deleteBrand = async (brandId) => {
  try {
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      throw new Error('Marca não encontrada');
    }
    await brand.destroy();
    return { message: 'Marca deletada com sucesso' };
  } catch (error) {
    throw new Error('Erro ao deletar marca: ' + error.message);
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand
};
