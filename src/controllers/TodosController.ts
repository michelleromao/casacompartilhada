import { Request, Response } from 'express';
import { format } from 'date-fns-tz';
import { startOfDay, differenceInHours, getDay, getDate } from 'date-fns';

import ToDos from "../models/Todos";
import Does from "../models/Does";

import IndexToDoDTO from "../interfaces/IndexToDoDTO"
import IndexDoesDTO from "../interfaces/IndexDoesDTO"

export = {
  async index(request: Request, response: Response){
    try{
      const {id} = request.params;
      const {frequency, does} = request.query;
      if(frequency){
        if(frequency === 'daily'){
          const find = await ToDos.findByFrequency(id, frequency);
          if(find){
            Promise.all(find?.map((todo: IndexToDoDTO) => {
              return({
                id: todo.id,
                task: todo.task,
                frequency: todo.frequency,
                day_of_week: todo.day_of_week,
                day_of_month: todo.day_of_month,
                creator_id: todo.creator_id,
                home_id: todo.home_id,
                created_at: todo.created_at
              })
            })).then(resp => {
              var idTodos: string[] = [];
              var toResp: IndexToDoDTO[] = [];
              Promise.all(resp.map((rp: IndexToDoDTO) => {
                idTodos.push(rp.id);
                return Does.findByToDoId(rp.id);
              })).then((respo) => {
                var respon = respo[0];
                var idDoes: string[] = [];
                respon?.forEach((item) => {
                  idTodos.forEach((id) => {
                    if(item.todo_id === id){
                      idDoes.push(item.todo_id);
                      const difference = differenceInHours(startOfDay(new Date()), startOfDay(new Date(item.created_at)))
                      if(difference > 24){
                        toResp.push(item.todo_id);
                      }
                    }
                  })
                })
                var difference = idTodos.filter(x => idDoes.indexOf(x) === -1);
                if(difference.length !== 0){
                  difference.forEach(item => {
                    toResp.push(`${item}`);
                  })
                }
                Promise.all(toResp.map(item => {
                  return ToDos.findById(`${item}`);
                })).then(rp => {
                  return response.json({daily: rp});
                });
              })
            });
          }
        }else if(frequency === 'weekly'){
          const find = await ToDos.findByFrequency(id, frequency);
          const todos = find?.map((todo: IndexToDoDTO) => {
            return({
              id: todo.id,
              task: todo.task,
              day_of_week: todo.day_of_week,
              day_of_month: todo.day_of_month,
              creator_id: todo.creator_id,
              home_id: todo.home_id
            })
          });
          if(todos){
            const today = getDay(startOfDay(new Date()));
            if(today === 0){
              Promise.all(todos.map(todo => {
                if(todo.day_of_week === 'domingo'){
                  return todo;
                }
              })).then(resp => {
                resp = resp.filter(Boolean);
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                Promise.all(resp.map((rp: IndexToDoDTO) => {
                  idTodos.push(rp.id);
                  return Does.findByToDoId(rp.id);
                })).then((respo) => {
                  var respon = respo[0];
                  var idDoes: string[] = [];
                  respon?.forEach((item) => {
                    idTodos.forEach((id) => {
                      if(item.todo_id === id){
                        idDoes.push(item.todo_id);
                        const difference = differenceInHours(startOfDay(new Date()), startOfDay(new Date(item.created_at)))
                        if(difference > 24){
                          toResp.push(item.todo_id);
                        }
                      }
                    })
                  })
                  var difference = idTodos.filter(x => idDoes.indexOf(x) === -1);
                  if(difference.length !== 0){
                    difference.forEach(item => {
                      toResp.push(`${item}`);
                    })
                  }
                  Promise.all(toResp.map(item => {
                    return ToDos.findById(`${item}`);
                  })).then(rp => {
                    return response.json({weekly: rp});
                  });
                })
              })
            }else if(today === 1){
              Promise.all(todos.map(todo => {
                if(todo.day_of_week === 'segunda-feira'){
                  return todo;
                }
              })).then(resp => {
                resp = resp.filter(Boolean);
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                Promise.all(resp.map((rp: IndexToDoDTO) => {
                  idTodos.push(rp.id);
                  return Does.findByToDoId(rp.id);
                })).then((respo) => {
                  var respon = respo[0];
                  var idDoes: string[] = [];
                  respon?.forEach((item) => {
                    idTodos.forEach((id) => {
                      if(item.todo_id === id){
                        idDoes.push(item.todo_id);
                        const difference = differenceInHours(startOfDay(new Date()), startOfDay(new Date(item.created_at)))
                        if(difference > 24){
                          toResp.push(item.todo_id);
                        }
                      }
                    })
                  })
                  var difference = idTodos.filter(x => idDoes.indexOf(x) === -1);
                  if(difference.length !== 0){
                    difference.forEach(item => {
                      toResp.push(`${item}`);
                    })
                  }
                  Promise.all(toResp.map(item => {
                    return ToDos.findById(`${item}`);
                  })).then(rp => {
                    return response.json({weekly: rp});
                  });
                })
              })
            }else if(today === 2){
              Promise.all(todos.map(todo => {
                if(todo.day_of_week === 'terca-feira'){
                  return todo;
                }
              })).then(resp => {
                resp = resp.filter(Boolean);
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                Promise.all(resp.map((rp: IndexToDoDTO) => {
                  idTodos.push(rp.id);
                  return Does.findByToDoId(rp.id);
                })).then((respo) => {
                  var respon = respo[0];
                  var idDoes: string[] = [];
                  respon?.forEach((item) => {
                    idTodos.forEach((id) => {
                      if(item.todo_id === id){
                        idDoes.push(item.todo_id);
                        const difference = differenceInHours(startOfDay(new Date()), startOfDay(new Date(item.created_at)))
                        if(difference > 24){
                          toResp.push(item.todo_id);
                        }
                      }
                    })
                  })
                  var difference = idTodos.filter(x => idDoes.indexOf(x) === -1);
                  if(difference.length !== 0){
                    difference.forEach(item => {
                      toResp.push(`${item}`);
                    })
                  }
                  Promise.all(toResp.map(item => {
                    return ToDos.findById(`${item}`);
                  })).then(rp => {
                    return response.json({weekly: rp});
                  });
                })
              })
            }else if(today === 3){
              Promise.all(todos.map(todo => {
                if(todo.day_of_week === 'quarta-feira'){
                  return todo;
                }
              })).then(resp => {
                resp = resp.filter(Boolean);
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                Promise.all(resp.map((rp: IndexToDoDTO) => {
                  idTodos.push(rp.id);
                  return Does.findByToDoId(rp.id);
                })).then((respo) => {
                  var respon = respo[0];
                  var idDoes: string[] = [];
                  respon?.forEach((item) => {
                    idTodos.forEach((id) => {
                      if(item.todo_id === id){
                        idDoes.push(item.todo_id);
                        const difference = differenceInHours(startOfDay(new Date()), startOfDay(new Date(item.created_at)))
                        if(difference > 24){
                          toResp.push(item.todo_id);
                        }
                      }
                    })
                  })
                  var difference = idTodos.filter(x => idDoes.indexOf(x) === -1);
                  if(difference.length !== 0){
                    difference.forEach(item => {
                      toResp.push(`${item}`);
                    })
                  }
                  Promise.all(toResp.map(item => {
                    return ToDos.findById(`${item}`);
                  })).then(rp => {
                    return response.json({weekly: rp});
                  });
                })
              })
            }else if(today === 4){
              Promise.all(todos.map(todo => {
                if(todo.day_of_week === 'quinta-feira'){
                  return todo;
                }
              })).then(resp => {
                resp = resp.filter(Boolean);
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                Promise.all(resp.map((rp: IndexToDoDTO) => {
                  idTodos.push(rp.id);
                  return Does.findByToDoId(rp.id);
                })).then((respo) => {
                  var respon = respo[0];
                  var idDoes: string[] = [];
                  respon?.forEach((item) => {
                    idTodos.forEach((id) => {
                      if(item.todo_id === id){
                        idDoes.push(item.todo_id);
                        const difference = differenceInHours(startOfDay(new Date()), startOfDay(new Date(item.created_at)))
                        if(difference > 24){
                          toResp.push(item.todo_id);
                        }
                      }
                    })
                  })
                  var difference = idTodos.filter(x => idDoes.indexOf(x) === -1);
                  if(difference.length !== 0){
                    difference.forEach(item => {
                      toResp.push(`${item}`);
                    })
                  }
                  Promise.all(toResp.map(item => {
                    return ToDos.findById(`${item}`);
                  })).then(rp => {
                    return response.json({weekly: rp});
                  });
                })
              })
            }else if(today === 5){
              Promise.all(todos.map(todo => {
                if(todo.day_of_week === 'sexta-feita'){
                  return todo;
                }
              })).then(resp => {
                resp = resp.filter(Boolean);
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                Promise.all(resp.map((rp: IndexToDoDTO) => {
                  idTodos.push(rp.id);
                  return Does.findByToDoId(rp.id);
                })).then((respo) => {
                  var respon = respo[0];
                  var idDoes: string[] = [];
                  respon?.forEach((item) => {
                    idTodos.forEach((id) => {
                      if(item.todo_id === id){
                        idDoes.push(item.todo_id);
                        const difference = differenceInHours(startOfDay(new Date()), startOfDay(new Date(item.created_at)))
                        if(difference > 24){
                          toResp.push(item.todo_id);
                        }
                      }
                    })
                  })
                  var difference = idTodos.filter(x => idDoes.indexOf(x) === -1);
                  if(difference.length !== 0){
                    difference.forEach(item => {
                      toResp.push(`${item}`);
                    })
                  }
                  Promise.all(toResp.map(item => {
                    return ToDos.findById(`${item}`);
                  })).then(rp => {
                    return response.json({weekly: rp});
                  });
                })
              })
            }else if(today === 6){
              Promise.all(todos.map(todo => {
                if(todo.day_of_week === 'sabado'){
                  return todo;
                }
              })).then(resp => {
                resp = resp.filter(Boolean);
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                var idTodos: string[] = [];
                var toResp: IndexToDoDTO[] = [];
                Promise.all(resp.map((rp: IndexToDoDTO) => {
                  idTodos.push(rp.id);
                  return Does.findByToDoId(rp.id);
                })).then((respo) => {
                  var respon = respo[0];
                  var idDoes: string[] = [];
                  respon?.forEach((item) => {
                    idTodos.forEach((id) => {
                      if(item.todo_id === id){
                        idDoes.push(item.todo_id);
                        const difference = differenceInHours(startOfDay(new Date()), startOfDay(new Date(item.created_at)))
                        if(difference > 24){
                          toResp.push(item.todo_id);
                        }
                      }
                    })
                  })
                  var difference = idTodos.filter(x => idDoes.indexOf(x) === -1);
                  if(difference.length !== 0){
                    difference.forEach(item => {
                      toResp.push(`${item}`);
                    })
                  }
                  Promise.all(toResp.map(item => {
                    return ToDos.findById(`${item}`);
                  })).then(rp => {
                    return response.json({weekly: rp});
                  });
                })
              })
            }

          }
        }else if(frequency === 'monthly'){
          const find = await ToDos.findByFrequency(id, frequency);
          const todos = find?.map((todo: IndexToDoDTO) => {
            return({
              id: todo.id,
              task: todo.task,
              day_of_week: todo.day_of_week,
              day_of_month: todo.day_of_month,
              creator_id: todo.creator_id,
              home_id: todo.home_id
            })
          });
          if(todos){
            const today = getDate(startOfDay(new Date()));
            Promise.all(todos.map((todo) => {
              if(todo.day_of_month === today){
                return todo;
              }
            })).then(resp => {
              resp = resp.filter(Boolean);
              var idTodos: string[] = [];
              var toResp: IndexToDoDTO[] = [];
              var idTodos: string[] = [];
              var toResp: IndexToDoDTO[] = [];
              Promise.all(resp.map((rp: IndexToDoDTO) => {
                idTodos.push(rp.id);
                return Does.findByToDoId(rp.id);
              })).then((respo) => {
                var respon = respo[0];
                var idDoes: string[] = [];
                respon?.forEach((item) => {
                  idTodos.forEach((id) => {
                    if(item.todo_id === id){
                      idDoes.push(item.todo_id);
                      const difference = differenceInHours(startOfDay(new Date()), startOfDay(new Date(item.created_at)))
                      if(difference > 24){
                        toResp.push(item.todo_id);
                      }
                    }
                  })
                })
                var difference = idTodos.filter(x => idDoes.indexOf(x) === -1);
                if(difference.length !== 0){
                  difference.forEach(item => {
                    toResp.push(`${item}`);
                  })
                }
                Promise.all(toResp.map(item => {
                  return ToDos.findById(`${item}`);
                })).then(rp => {
                  return response.json({monthly: rp});
                });
              })
            })
          }
        }
      }
      else if(does === 'true'){
        const findToDos = await ToDos.findByIdHome(id);
        const done = findToDos?.map((todo) => {
          return(todo.id);
        });
        if(done){
          Promise.all(done.map((item) => {
            const doesId =  Does.findByToDoId(item);
            return doesId;
          })).then(resp =>{
            resp.forEach((rp) => {
              if(rp && rp?.length !== 0)
              return response.json(rp)
            })
          })
        }
      }else{
        const {id} = request.params;
        const find = await ToDos.findById(id);
        const todo = find?.map((todo: IndexToDoDTO) => {
          return({
            id: todo.id,
            task: todo.task,
            day_of_week: todo.day_of_week,
            day_of_month: todo.day_of_month,
            creator_id: todo.creator_id,
            home_id: todo.home_id
          })
        });
        if(todo){
          return response.json(todo);
        }
      }
    }catch(err){
      console.log(err);
    }
  },

  async store(request: Request, response: Response){
    try{
      const {
        task,
        frequency,
        day_of_week,
        day_of_month,
        creator_id,
        home_id
      } = request.body;
      const todo = await ToDos.create({task,
        frequency,
        day_of_week,
        day_of_month,
        creator_id, home_id});
      return response.json(todo);
    }catch(err){
      console.log(err);
    }
  },

  async update(request: Request, response: Response){
    try{
      const {id} = request.params;
      const {
        task,
        frequency,
        day_of_week,
        day_of_month,
        creator_id
      } = request.body;
      const todo = await ToDos.update({task,
        frequency,
        day_of_week,
        day_of_month}, id, creator_id);
        return response.json(todo);
    }catch(err){
      console.log(err);
    }
  },

  async delete(request: Request, response: Response){
    try{
      const {id} = request.params;
      const {creator_id} = request.body;
      const todo = await ToDos.findByIdAndDelete(id, creator_id);
      return response.json({message: 'ToDo item deleted'});
    }catch(err){
      console.log(err);
    }
  }
}
