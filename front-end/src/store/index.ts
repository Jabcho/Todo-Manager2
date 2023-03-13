import { defineStore } from 'pinia';
import axios from 'axios';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from '@/router';
import { LocationQueryValue } from 'vue-router';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export interface TodoItem {
    id: number,
    list: string
}

export interface TodoListStore {
    todoItems: TodoItem[];
}

export interface UserStore {
    isLoggined: boolean,
    usedId: boolean
}

//let isLoggined = false;

export const useTodoListStore = defineStore('todoList', {
    state: (): TodoListStore => {
        return {
            todoItems: [],
        }  
    },
    persist: true,

    actions: {
        async addTodo(newTodoItem: string) {
            
            try {
                const res = await axios({
                    method: 'post',
                    url: '/api/todolist/todo',
                    data: {
                        newTodo: newTodoItem
                    }
                });
                this.todoItems.push(res.data);
            } catch (err: any) {
                const userStore = useUserStore();
                if (err.response.status == 401) {
                    userStore.isLoggined = false;
                    alert("다시 로그인해 주세요")
                    router.replace("/");
                    return

                }
                console.log('뭔가 틀리긴 함');
            }
            
        },
        async getAllTodo() {
            try {
                const res = await axios.get('/api/todolist/todo');

                if (res.data.length === 0) {
                    this.todoItems = [];
                } else {
                    this.todoItems = [];
                    for (let i = 0; i < res.data.length; i++) {
                        this.todoItems.push(res.data[i]);
                    }
                }
            } catch (err) {
                console.log('너니?', err);
            }
        },
        async removeTodo(remove_id: number){
            try {
                console.log(remove_id)
                await axios.delete(`/api/todolist/todo/${remove_id}`)
                
                this.todoItems.forEach((cur: TodoItem, idx: number) => {
                    if (cur.id == remove_id) {
                        this.todoItems.splice(idx, 1);
                        return
                    }
                })

            } catch (err: any) {
                const userStore = useUserStore();
                if (err.response.status == 401) {
                    console.log(err.response.status)
                    userStore.isLoggined = false;
                    alert("다시 로그인해 주세요")
                    router.replace("/");
                }
                console.log('뭔가 틀리긴 함');
            }
        },
        async clearAll() {
            try {
                await axios.delete('/api/todolist/todo');
                this.todoItems = [];
            } catch (err: any) {
                const userStore = useUserStore();
                if (err.response.status == 401) {
                    userStore.isLoggined = false;
                    alert("다시 로그인해 주세요")
                    router.replace("/");
                }
                console.log('뭔가 틀리긴 함');
            }
        } 
    }
})


export const useUserStore = defineStore('user', {
    state: (): UserStore => {
        return {
            isLoggined: false,
            usedId: false
        }
    },
    persist: true,
    actions: {
        async login(userId: string, userPw: string) {
            try {
                await axios({
                    method: 'post',
                    url: '/api/users/login',
                    data: {
                        userId: userId,
                        userPw: userPw
                    }
                });
                this.isLoggined = true;
                return true;
            } catch (err) {
                console.log(err)
                return false;
            }
        },
        async userIdCheck(userId: string) {
            try {
                await axios.get(`/api/users/signup/check/${userId}`);
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        },
        async logout() {
            try {
                await axios.get('/api/users/logout');
                return true;
            } catch(err) {
                console.log(err);
                return false;
            }
        }
    },
})

export const useSignupStore = defineStore('signup', {
    actions: {
        async signUp(userName: string, userId: string, userPw: string, userEmail: string) {
            try {
                await axios({
                    method: 'post',
                    url: '/api/users/signup',
                    data: {
                        userId: userId,
                        userPw: userPw,
                        name: userName,
                        email: userEmail
                    }
                });
                return true;
            } catch(err) {
                return false;
            }
        },
        async auth(email: string, authCode: number) {
            try {
                await axios({
                    method: 'post',
                    url: '/api/users/auth',
                    data: {
                        email: email,
                        authCode: authCode
                    }
                });
                return true;
            } catch(err: any) {
                return err.response.status;
            }
        }
    }
})