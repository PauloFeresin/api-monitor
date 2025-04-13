const { getApis, registerApi, updateApi, deleteApi } = require('../services/apiService')

async function listApis(req, res) {
  try {
    const apis = await getApis()
    res.status(200).json(apis)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar APIs' })
  }
}

async function createApi(req, res) {
  try {
    const id = await registerApi(req.body)
    res.status(201).json({ id })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar API' })
  }
}

async function putApi(req, res) {
  try {
    const success = await updateApi(req.params.id, req.body)
    if (!success) return res.status(404).json({ message: 'API não encontrada' })

    res.status(200).json({ message: 'API atualizada com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a API' })
  }
}

async function removeApi(req, res) {
  try {
    const success = await deleteApi(req.params.id)
    if (!success) return res.status(404).json({ message: 'API não encontrada' })

    res.status(200).json({ message: 'API deletada com sucesso' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a API' })
  }
}

module.exports = { listApis, createApi, putApi, removeApi }
